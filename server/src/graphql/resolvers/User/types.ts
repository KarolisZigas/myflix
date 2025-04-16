import { Movie, SavedMovie } from "../../../lib/types";

export interface UserArgs {
    id: string;
}

export interface UserMovieArgs {
    limit: number;
    page: number;
}

export interface UserMovieData {
    total: number;
    result: SavedMovie[];
}