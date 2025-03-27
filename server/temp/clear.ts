require('dotenv').config();
import { connectDatabase } from "../src/database";
import { Movie } from "../src/lib/types";

const clear = async () => {
    try {
        console.log('[clear]: starting')
        const db = await connectDatabase();

        const movies: Movie[] = await db.movies.find({}).toArray();

        if (movies.length > 0) {
            db.movies.drop();
        } else {
            throw new Error('[clear]: movies collection not found')
        }

        console.log('[clear]: completed!');

    } catch (e) {
        throw new Error('[clear]: error')
    }
}

clear()