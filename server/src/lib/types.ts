import { Collection, ObjectId } from "mongodb";

export interface Viewer {
    _id?: string;
    token?: string;
    avatar?: string;
    walletId?: string;
    didRequest?: boolean;
}

export interface Movie {
    _id: ObjectId;
    originalId: number;
    imdbId: string;
    title: string;
    rating: number;
    description: string;
    poster: string;
    releaseDate: string;
    genres: number[];
    isSaved?: boolean;
}

export interface SavedMovie {
    _id: ObjectId;
    userId: string;
    movieId: string;
    savedAt: string;
    notes: string;
    rating: number | null;
  }

export interface SavedMoviesResponse {
    total: number;
    result: SavedMovie[];
}

export interface MovieResponse {
    movies: Movie[],
    totalPages: number,
    totalResults: number,
    page: number,
}

export interface User {
    _id: string;
    savedMovies: ObjectId[];
    token: string,
    avatar: string,
    name: string,
    contact: string,
    authorized?: boolean;
    token_last?: string;
}

export interface Database {
    users: Collection<User>;
    movies: Collection<Movie>;
    savedMovies: Collection<SavedMovie>
}