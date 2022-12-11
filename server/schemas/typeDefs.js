const { gql } = require('apollo-server-express');

const typeDefs = gql`
# keeps track of the user and their data
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    # sets up book data
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    # sets up book input
    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    # sets up a user/tracks user login information and their data
    type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(bookData: BookInput): User
      removeBook(bookId: String!): User
    }
`;

    module.exports = typeDefs;