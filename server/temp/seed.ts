require('dotenv').config();
import { error } from "console";
import { connectDatabase } from "../src/database";
import { Movie } from "../src/lib/types";
import { ObjectId } from "mongodb";

const seed = async () => {
    try {
        console.log('[seed]: running...');

        const db = await connectDatabase();


        const { MovieDb } = require('moviedb-promise');

        const moviedb = new MovieDb(process.env.MOVIEDB_API);

        const moviesDB = await moviedb.searchMovie({ 
            query: 'dead',
            page: 1,
            limit: 10,
         })

        console.log(moviesDB);

        const moviesWithImdb = await Promise.all(
            moviesDB.results.slice(0, 10).map(async (movie: any) => {
                const movieDetails = await moviedb.movieInfo({
                    id: movie.id,
                    append_to_response: 'external_ids'
                });
                return {
                    _id: new ObjectId(),
                    originalId: movie.id,
                    imdbId: movieDetails.imdb_id, // This is the IMDB ID
                    title: movie.title,
                    rating: movie.vote_average,
                    description: movie.overview,
                    releaseDate: movie.release_date,
                    poster: movie.poster_path,
                    genres: movie.genre_ids
                };
            })
        );

        db.movies.insertMany(moviesWithImdb);

        console.log('[seed]: complete!')

    } catch (e) {
        throw new Error('[seed]: error');
    }
}

seed();