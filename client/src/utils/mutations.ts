import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
 mutation addUser($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($book: BookInput!) {
  saveBook(book: $book) {
    _id
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;
