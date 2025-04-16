import { IResolvers } from "@graphql-tools/utils";
import { ObjectId } from "mongodb";
import { Database, Movie, SavedMovie } from '../../../lib/types';

export const savedMovieResolvers: IResolvers = {
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
        }
    }
}