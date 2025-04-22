import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, Movie, SavedMovie } from '../../../lib/types';
import { MovieDetailsInput, UserIdResolverResponse } from "./types";

export const savedMovieResolvers: IResolvers = {
    Query: {
        getComments: async (
            _root: undefined,
            { movieId }: { movieId: number },
            { db }: { db: Database }
        ) => {
            const movieObject = await db.movies.findOne({
                originalId: movieId
            })

            const savedMovies = await db.savedMovies.find({
                movieId: movieObject?._id.toString(),
                notes: { $exists: true, $ne: "" }
            }).toArray();

            const total = await db.savedMovies.countDocuments({
                movieId: movieObject?._id.toString(),
                notes: { $exists: true, $ne: "" }
            });

            return {
                total,
                result: savedMovies
            };
        }
    },
    Mutation: {
        addComments: async (
            _root: undefined,
            { saveMovieId, details }: { saveMovieId: string, details: MovieDetailsInput },
            { db }: { db: Database },
        ): Promise<String> => {
            const updateSaveMovieDetails = await db.savedMovies.findOneAndUpdate(
                { _id: new ObjectId(saveMovieId) },
                { $set: { notes: details.note, rating: details.rating } },
                { returnDocument: 'after'}
            )

            if (!updateSaveMovieDetails) {
                throw new Error('Unable to update saved movie details');
            }

            return updateSaveMovieDetails._id.toString();
        }
    },
    SavedMovie: {
        id: (savedMovie: SavedMovie): string => savedMovie._id.toString(),
        movie: async (
            savedMovie: SavedMovie,
            _args: {},
            { db }: { db: Database }
        ): Promise<Movie> => {
            const movie = await db.movies.findOne({ 
                _id: new ObjectId(savedMovie.movieId)
            })

            if (!movie) {
                throw new Error(`Movie with ID ${savedMovie.movieId} not found`);
            }

            return movie
        },
        userId: async (
            savedMovie: SavedMovie,
            _args: {},
            { db }: { db: Database }
        ): Promise<UserIdResolverResponse> => {
            const user = await db.users.findOne({
                _id: savedMovie.userId
            })

            if (!user) {
                throw new Error(`User not found: ${savedMovie.userId}`);
            }

            return {
                name: user.name,
                avatar: user.avatar,
                id: user._id
            };
        }
    }
}