import { gql } from "@apollo/client"

export const AVAILABLE_MOVIES = gql`
    query availableMovies {
        availableMovies {
            id
            originalId
            imdbId
            title
            rating
            description
            poster
            releaseDate
            genres
        }
    }
`

export const SEARCH_MOVIE_ID = gql`
    query searchMovieId($originalId: Int!) {
        searchMovieId(originalId: $originalId) {
            id
            title
            originalId
            imdbId
            description
            rating
            genres
            releaseDate
            poster
            isSaved
        }
    }
`

export const SEARCH_MOVIES = gql`
    query searchMovies($title: String!, $page: Int, $viewerId: String) {
        searchMovies(title: $title, page: $page, viewerId: $viewerId) {
            movies {
                id
                originalId
                imdbId
                title
                rating
                description
                poster
                releaseDate
                genres
                isSaved
            }
            totalPages
            totalResults
            page
        }
    }
`