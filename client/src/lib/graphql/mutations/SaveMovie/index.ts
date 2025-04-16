import { gql } from "@apollo/client";

export const SAVE_MOVIE = gql`
    mutation saveMovie($movie: MovieInput, $userId: ID!) {
        saveMovie(movie: $movie, userId: $userId)
    }
`