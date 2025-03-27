require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { resolvers } from './graphql';
import { typeDefs } from './graphql/typeDefs';

const startServer = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ db })
    })

    await server.start();
    
    server.applyMiddleware({ app, path: '/api' });
    app.listen(process.env.PORT, () => {
        console.log(`[app]: http://localhost:${process.env.PORT}`);
    });
}

startServer(express());