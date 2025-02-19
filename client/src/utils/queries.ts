import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query GetUser {
  getUser {
    _id
    bookCount
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
}
`;

