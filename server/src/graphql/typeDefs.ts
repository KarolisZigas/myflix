import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    originalId: Int!
    imdbId: String
    description: String
    rating: Float
    genres: [Int]
    releaseDate: String
    poster: String
  }

  type Query {
    movies: [Movie!]!
  }

  type Mutation {
    saveMovie(
      title: String!
      description: String
      genre: String
      releaseDate: String
    ): Movie!
  }
`;