import merge from 'lodash.merge'
import { movieResolvers } from './Movie'
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';
import { savedMovieResolvers } from './SavedMovie';

export const resolvers = merge(
    savedMovieResolvers,
    movieResolvers,
    viewerResolvers,
    userResolvers
);