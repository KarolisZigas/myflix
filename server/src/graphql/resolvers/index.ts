import merge from 'lodash.merge'
import { movieResolvers } from './Movies'
import { viewerResolvers } from './Viewer';

export const resolvers = merge(
    movieResolvers,
    viewerResolvers
);