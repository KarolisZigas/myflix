import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    description: String
    genre: Genre
    releaseDate: String
  }

  type Genre {
    id: ID!
    name: String!
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