import { gql } from '@apollo/client';

// This will execute the 'me' query set up using Apollo Server in typeDefs.js.

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;