import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation signUp($username: String!, $password: String!, $name: String!) {
    signUp(username: $username, password: $password, name: $name)
  }
`;

export const SIGNIN_USER = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export const NEW_THING = gql`
  mutation newThing(
    $description: String!
    $rating: Int!
    $title: String!
    $image: String
    $category: [ID]!
  ) {
    newThing(
      title: $title
      description: $description
      rating: $rating
      image: $image
      category: $category
    ) {
      _id
      title
      description
      rating
      category
      author {
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_THING = gql`
  mutation updateThing(
    $id: ID!
    $rating: Int
    $title: String
    $description: String
    $category: [ID]
    $image: String
  ) {
    updateThing(
      id: $id
      rating: $rating
      title: $title
      description: $description
      category: $category
      image: $image
    ) {
      _id
      title
      description
      rating
      image
      category
      author {
        _id
        username
      }
    }
  }
`;

export const DELETE_THING = gql`
  mutation deleteThing($id: ID!) {
    deleteThing(id: $id)
  }
`;
export const NEW_CATEGORY = gql`
  mutation newCategory($title: String!, $directAncestor: ID) {
    newCategory(title: $title, directAncestor: $directAncestor) {
      _id
      title
      directAncestor
      ancestors
      descendants {
        _id
        title
      }
    }
  }
`;
