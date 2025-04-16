import { IResolvers } from '@graphql-tools/utils';
import { Database, Movie, User, MovieResponse, Viewer } from '../../../lib/types';
import { ObjectId, ReturnDocument } from 'mongodb';
import { DeleteMovieArgs, SaveMovieArgs } from './types';
import { MovieDb } from 'moviedb-promise';

export const movieResolvers: IResolvers = {
    Query: {
        availableMovies: async (
            _root: undefined,
            _args: {},
            { db } : { db: Database }
        ): Promise<Movie[]> => {
            return await db.movies.find({}).toArray();
        },
        searchMovies: async (
            _root: undefined,
            { title, page = 1, viewerId } : { title: string, page: number, viewerId: string },
            { db } : { db: Database }
        ): Promise<MovieResponse> => {
            const moviedb = new MovieDb(process.env.MOVIEDB_API ?? "");

            try {
                const moviesDB = await moviedb.searchMovie({
                    query: title,
                    page,
                })
    
                if (!moviesDB.results) {
                    throw new Error('Unable to search movies');
                }
    
                const movies = await Promise.all(
                    moviesDB.results.map(async (movie: any) => {
                        try {
                            const movieDetails = await moviedb.movieInfo({
                                id: movie.id,
                                append_to_response: 'external_ids'
                            });
        
                            const existingMovie = await db.movies.findOne({
                                originalId: movie.id
                            })
        
                            const isSaved = existingMovie ? await db.savedMovies.findOne({
                                movieId: existingMovie._id.toString(),
                                userId: viewerId
                            }) : null;
        
                            return {
                                _id: new ObjectId(),
                                originalId: movie.id,
                                imdbId: movieDetails.imdb_id || '',
                                title: movie.title,
                                rating: movie.vote_average,
                                description: movie.overview,
                                releaseDate: movie.release_date,
                                poster: movie.poster_path,
                                genres: movie.genre_ids,
                                isSaved: !!isSaved
                            };
                        } catch (error) {
                            console.error(`Error processing movie ${movie.id}`)
                            return null;
                        }
                    })
                );
    
                const validMovies = movies.filter(movie => movie !== null);

                return {
                    movies: validMovies, 
                    totalPages: moviesDB.total_pages || 0,
                    totalResults: moviesDB.total_results || 0,
                    page: moviesDB.page || 1
                };
            } catch (error) {
                throw new Error(`Failed to search movies: ${error}`);
            }
        }
    },
    Mutation: {
        saveMovie: async (
            _root: undefined,
            { movie, userId }: SaveMovieArgs,
            { db }:{ db: Database }
        ): Promise<String> => {
            const existingMovie = await db.movies.findOne({
                originalId: movie.originalId
            })

            let movieId;

            if (!existingMovie) {
                const movieInsert = await db.movies.insertOne({
                    _id: new ObjectId(),
                    originalId: movie.originalId,
                    imdbId: movie.imdbId,
                    title: movie.title,
                    description: movie.description,
                    rating: movie.rating,
                    releaseDate: movie.releaseDate,
                    poster: movie.poster,
                    genres: movie.genres
                })
                movieId = movieInsert.insertedId;
            } else {
                movieId = existingMovie._id;
            }

            const existingSavedMovie = await db.savedMovies.findOne({
                movieId: movieId.toString()
            })

            if (!existingSavedMovie) {
                const savedMovieInsert = await db.savedMovies.insertOne({
                    _id: new ObjectId(),
                    userId: userId,
                    movieId: movieId.toString(),
                    savedAt: new Date().toISOString(),
                    notes: '',
                    rating: null,
                })
    
                const userMovieUpdate = await db.users.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            savedMovies: savedMovieInsert.insertedId,
                        }
                    },
                    {
                        returnDocument: "after"
                    }
                )

                if (!userMovieUpdate) {
                    throw new Error('There has been an error while adding the movie.');
                }
            } else {
                throw new Error('You have already saved this movie');
            }

            return movieId.toString();
        },
        deleteMovie: async (
            _root: undefined,
            { movieId, userId }: DeleteMovieArgs,
            { db }: { db: Database }
        ): Promise<String> => {
            const existingMovie = await db.movies.findOne({
                originalId: movieId
            })

            if (!existingMovie) {
                throw new Error(`Movie #${movieId} not found`);
            }            

            const existingSavedMovie = await db.savedMovies.findOneAndDelete({
                userId: userId,
                movieId: existingMovie._id.toString()
            })

            if (!existingSavedMovie) {
                throw new Error(`Saved movie #${movieId} not found`)
            }

            const userMovieUpdate = await db.users.findOneAndUpdate(
                { _id: userId},
                { 
                    $pull: {
                        savedMovies: existingSavedMovie._id
                    }
                },
                { returnDocument: 'after' }
            )


            if (!userMovieUpdate) {
                throw new Error(`Unable to delete movie from user saved movies.`)
            }

            const otherSavedMovies = await db.savedMovies.find({
                movieId: existingMovie._id.toString()
            }).toArray()

            if (otherSavedMovies.length < 1) {
                const deleteExistingMovie = await db.movies.deleteOne({
                    originalId: movieId
                })
            }

            return movieId.toString();
        }
    },
    Movie: {
        id: (movie: Movie): string => movie._id.toString()
    },
    SavedMovie: {
        id: (movie: Movie): string => movie._id.toString(),
    }
}