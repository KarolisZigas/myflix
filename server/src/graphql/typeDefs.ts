import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

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

  type MovieResponse {
    movies: [Movie!]!
    totalPages: Int!
    totalResults: Int!
    page: Int!
  }

  input LogInInput {
    code: String!
  }

  type Query {
    availableMovies: [Movie!]!
    searchMovies(title: String!, page: Int): MovieResponse!
    authUrl: String!
  }

  type Mutation {
    saveMovie(
      title: String!
      description: String
      genre: String
      releaseDate: String
    ): Movie!
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;