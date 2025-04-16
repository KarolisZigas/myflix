import { Movie } from "../../../lib/types";

export interface SaveMovieArgs {
    movie: Movie;
    userId: string;
}

export interface DeleteMovieArgs {
    movieId: number;
    userId: string;
}