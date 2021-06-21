import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
// import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
// import Post from './resolvers/Post';
import ChatBox from './resolvers/ChatBox';
import Message from './resolvers/Message';
import mongo from './mongo.js';

require('dotenv-defaults').config();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Query,
    Subscription,
    ChatBox,
    User,
    Message
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect()

server.start({ port: process.env.PORT | 5001 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5001}!`);
});
