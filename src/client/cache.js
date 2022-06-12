import { gql } from '@apollo/client';

export const SET_IS_LOGGED_IN = gql`
  query WriteIsLoggedIn {
    isLoggedIn
  }
`;

export const IS_LOGGED_IN = gql`
  query ReadIsLoggedIn {
    isLoggedIn
  }
`;

