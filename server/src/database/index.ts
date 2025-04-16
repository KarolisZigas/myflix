import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.dnri7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url);

    const db = client.db('myflix');

    return {
        users: db.collection('users'),
        movies: db.collection('movies'),
        savedMovies: db.collection('savedMovies')
    };
};