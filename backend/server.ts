import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import next from 'next';
import { buildSchema } from 'type-graphql-v2-fork';

export async function createServer() {
  try {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = await buildSchema({
      resolvers: [__dirname + '/**/*Resolver.ts'],
    });

    const apolloServer = new ApolloServer({
      csrfPrevention: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      schema,
    });
    await apolloServer.start();

    app.use(
      '/graphql',
      cors(),
      json(),
      expressMiddleware(apolloServer, {
        context: async (context) => {
          return {
            req: context.req,
          };
        },
      })
    );

    return { app, httpServer };
  } catch (e) {
    console.log(`Error starting server: `, e);
    process.exit(1);
  }
}

export async function attachNextServer(app: express.Express) {
  const nextServer = next({
    dev: process.env.NODE_ENV !== 'production',
    hostname: 'localhost',
    port: 3000,
  });

  const nextHandler = nextServer.getRequestHandler();
  await nextServer.prepare();

  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });
}
