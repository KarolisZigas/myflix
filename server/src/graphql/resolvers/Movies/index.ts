import { IResolvers } from '@graphql-tools/utils';
import { Database, Movie, User, MovieResponse } from '../../../lib/types';
import { ObjectId } from 'mongodb';

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
            { title, page = 1 } : { title: string, page: number },
            { db } : { db: Database }
        ): Promise<MovieResponse> => {
            const { MovieDb } = require('moviedb-promise');
            const moviedb = new MovieDb(process.env.MOVIEDB_API);

            const moviesDB = await moviedb.searchMovie({
                query: title,
                page,
            })

            const movies = await Promise.all(
                moviesDB.results.map(async (movie: any) => {
                    const movieDetails = await moviedb.movieInfo({
                        id: movie.id,
                        append_to_response: 'external_ids'
                    });

                    return {
                        _id: new ObjectId(),
                        originalId: movie.id,
                        imdbId: movieDetails.imdb_id,
                        title: movie.title,
                        rating: movie.vote_average,
                        description: movie.overview,
                        releaseDate: movie.release_date,
                        poster: movie.poster_path,
                        genres: movie.genre_ids
                    };
                })
            );

            return {
                movies, 
                totalPages: moviesDB.total_pages,
                totalResults: moviesDB.total_results,
                page: moviesDB.page
            };
        }
    },
    Mutation: {
        saveMovie: async (
            _root: undefined,
            _args: {},
            { db }:{ db: Database }
        ) => {
            return 'saveMovie';
        }
    },
    Movie: {
        id: (movie: Movie):string => movie._id.toString()
    }
}