import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
    query getComments($movieId: Int!) {
        getComments(movieId: $movieId) {
            total
            result {
                id
                userId {
                    avatar
                    id
                    name
                }
                movieId
                savedAt
                notes
                rating
            }
        }
    }
`