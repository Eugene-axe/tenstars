import { gql } from '@apollo/client';

export const GET_THINGS = gql`
  query ThingFeed($cursor: String, $category: ID) {
    thingFeed(cursor: $cursor, category: $category) {
      cursor
      hasNextPage
      things {
        _id
        title
        description
        rating
        image
        category
        public
        author {
          _id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_MY_THINGS = gql`
  query myThingFeed($cursor: String, $category: ID) {
    myThingFeed(cursor: $cursor, category: $category) {
      cursor
      hasNextPage
      things {
        _id
        title
        description
        rating
        image
        category
        public
        author {
          _id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_THING = gql`
  query thing($_id: ID!) {
    thing(_id: $_id) {
      _id
      title
      description
      rating
      image
      category
      public
      author {
        _id
        username
      }
      createdAt
      updatedAt
    }
  }
`;
export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
export const CURRENT_CATEGORY = gql`
  {
    currentCategory @client
  }
`;

export const ME = gql`
  query me {
    me {
      username
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query categories($id: ID, $ancestor: ID) {
    categories(id: $id, ancestor: $ancestor) {
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

export const GET_ALL_CATEGORIES = gql`
  query allCategories {
    allCategories {
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

export const GET_CATEGORY = gql`
  query category($id: ID, $ancestor: ID) {
    category(id: $id, ancestor: $ancestor) {
      _id
      title
      directAncestor
      ancestors
      descendants {
        _id
        title
        descendants {
          _id
          title
        }
      }
    }
  }
`;
