const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    booksAll: [Book]
  }
`;

module.exports = typeDefs;
