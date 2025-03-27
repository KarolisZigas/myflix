import { IResolvers } from '@graphql-tools/utils';
import { Database, Movie, User } from '../../../lib/types';

export const movieResolvers: IResolvers = {
    Query: {
        movies: async (
            _root: undefined,
            _args: {},
            { db } : { db: Database }
        ): Promise<Movie[]> => {
            return await db.movies.find({}).toArray();
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
    }
}