//TODO add typedefs for all the schemas
const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
    }

    type Book {
        authors: [String]
        bookId: String
        description: String
        image: String
        link: String
        title: String
    }

    input BookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        getSingleUser: User
    }


    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;