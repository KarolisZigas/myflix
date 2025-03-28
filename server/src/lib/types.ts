import { Collection, ObjectId } from "mongodb";

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

export interface User {
    _id: ObjectId;
    movies: string[];
}

export interface Database {
    users: Collection<User>;
    movies: Collection<Movie>;
}