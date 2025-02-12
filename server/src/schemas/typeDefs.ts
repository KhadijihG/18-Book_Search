const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    title: String!
    authors: [String]
    description: String
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
  }
`;

export default typeDefs;
