import { gql } from "@apollo/client";

export const USER = gql`
    query User($id: ID!, $moviesPage: Int!, $limit: Int!) {
        user(id: $id) {
            id
            name
            avatar
            contact
            authorized
            savedMovies(limit: $limit, page: $moviesPage) {
                total
                result {
                    id
                    userId {
                        id
                    }
                    movieId
                    savedAt
                    notes
                    rating
                    movie {
                        id
                        originalId
                        imdbId
                        genres
                        title
                        poster
                        rating
                        releaseDate
                        description
                        isSaved
                    }
                }
            }
        }
    }
`;

