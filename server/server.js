//TODO add middleware for apollo and graphql use 19 and 20 exercises in MERN for reference
const express = require('express');
const { ApolloServer } = require('@apollo/server');//added by me
const { expressMiddleware } = require('apollo/server/express4');//added by me
const path = require('path');


const { typeDefs, resolvers } = require('./schemas');//added by me
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });//added by me


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//to use routes for graphql and apollo
const startApolloServer = async () => {
  await server.start();
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    //added by me for redirecting to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.use('/graphql', expressMiddleware({ server }));//added by me to switch to graphql

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();