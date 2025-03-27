import { Collection, ObjectId } from "mongodb";

export interface Genre {
    _id: ObjectId;
    title: string;
}

export interface Movie {
    _id: ObjectId;
    originalId: number;
    imdbId: number;
    title: string;
    rating: number;
    description: string;
    poster: string;
    releaseDate: string;
    genres: Genre[];
}

export interface User {
    _id: ObjectId;
    movies: string[];
}

export interface Database {
    users: Collection<User>;
    movies: Collection<Movie>;
}