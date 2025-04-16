export interface Viewer {
    id: string | null;
    token: string | null;
    avatar: string | null;
    hasWallet: boolean | null;
    didRequest: boolean;
}

export interface MovieInput {
    id: string;
    originalId: number;
    imdbId: string;
    title: string;
    rating: number | null;
    description: string;
    poster: string;
    releaseDate: string;
    genres: number[] | null;
}