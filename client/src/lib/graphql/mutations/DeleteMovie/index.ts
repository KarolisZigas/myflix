import { gql } from "@apollo/client";

export const DELETE_MOVIE = gql`
    mutation deleteMovie($movieId: Int!, $userId: ID!) {
        deleteMovie(movieId: $movieId, userId: $userId)
    }
`