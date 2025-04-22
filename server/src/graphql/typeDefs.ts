import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type SavedMovie {
    id: ID!
    userId: UserIdResolverResponse
    movieId: ID!
    savedAt: String!
    notes: String
    rating: Float
    movie: Movie!
  }

  type UserIdResolverResponse {
    name: String!
    avatar: String!
    id: String!
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
    authorized: Boolean
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
    getComments(movieId: Int): SavedMoviesResponse!
    availableMovies: [Movie!]!
    searchMovieId(originalId: Int!): Movie!
    searchMovies(title: String!, page: Int, viewerId: String): MovieResponse!
    authUrl: String!
    user(id: ID!): User!
  }

  input MovieDetailsInput {
    note: String,
    rating: Float,
  }

  type Mutation {
    addComments(saveMovieId: ID!, details: MovieDetailsInput): String
    saveMovie(movie: MovieInput, userId: ID!): String
    deleteMovie(movieId: Int!, userId: ID!): String
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;