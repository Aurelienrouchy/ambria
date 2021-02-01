const { ApolloServer } = require('apollo-server');
require('./src/database');

const typeDefs = require('./src/typeDefs.js');
const resolvers = require('./src/resolvers.js');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

  