import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
    mutation addComments($saveMovieId: ID!, $details: MovieDetailsInput) {
        addComments(saveMovieId: $saveMovieId, details: $details)
    }
`