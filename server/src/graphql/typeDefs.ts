import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type SavedMovie {
    id: ID!
    userId: ID!
    movieId: ID!
    savedAt: String!
    notes: String
    rating: Int
    movie: Movie!
  }

  type SavedMoviesResponse {
    total: Int!
    result: [SavedMovie!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    income: Int
    savedMovies(limit: Int!, page: Int!): SavedMoviesResponse
  }

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
    isSaved: Boolean
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

  input MovieInput {
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
    availableMovies: [Movie!]!
    searchMovies(title: String!, page: Int, viewerId: String): MovieResponse!
    authUrl: String!
    user(id: ID!): User!
  }

  type Mutation {
    saveMovie(movie: MovieInput, userId: ID!): String
    deleteMovie(movieId: Int!, userId: ID!): String
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;