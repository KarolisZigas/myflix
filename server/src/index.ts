require('dotenv').config();

import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { resolvers } from './graphql';
import { typeDefs } from './graphql/typeDefs';

const startServer = async (app: Application) => {
    const db = await connectDatabase();

    app.use(cookieParser(process.env.SECRET));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({ db, req, res })
    })

    await server.start();
    
    server.applyMiddleware({ app, path: '/api' });
    app.listen(process.env.PORT, () => {
        console.log(`[app]: http://localhost:${process.env.PORT}`);
    });
}

startServer(express());

