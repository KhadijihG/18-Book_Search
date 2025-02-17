const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  input UserInput {
      username: String!
      email: String!
      password: String!
  }

  type Book {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  input BookInput {
    bookId: ID!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  type Auth {
  token: ID!
  user: User
  }

  type Query {
    getUser: User
  }

  type Mutation {
    login (email:String!, password:String!):Auth
    addUser(input: UserInput!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

export default typeDefs;
