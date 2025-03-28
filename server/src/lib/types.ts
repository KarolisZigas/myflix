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
}

export interface MovieResponse {
    movies: Movie[],
    totalPages: number,
    totalResults: number,
    page: number,
}

export interface User {
    _id: string;
    movies: string[];
    token: string,
    avatar: string,
    name: string,
    contact: string,
}

export interface Database {
    users: Collection<User>;
    movies: Collection<Movie>;
}