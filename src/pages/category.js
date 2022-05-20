import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_THINGS } from '../client/query';
import ThingFeed from '../components/ThingFeed';
import ThingFeedLoader from '../components/loaders/thingFeedLoader';
const Category = props => {
  const categoryId = props.match.params.id;
  const { data, loading, error } = useQuery(GET_THINGS, {
    variables: {
      category: categoryId || ''
    }
  });

  if (error) {
    return (
      <p>
        The selected category is not yet filled. You can add something here by
        clicking on the <Link to="/new">Link</Link>.
      </p>
    );
  }

  return (
    <div>
      {loading ? (
        <ThingFeedLoader count={10} />
      ) : (
        <ThingFeed things={data.thingFeed.things} />
      )}
    </div>
  );
};

export default Category;
