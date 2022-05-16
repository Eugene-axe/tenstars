import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_THINGS } from '../client/query';
import ThingFeed from '../components/ThingFeed';

const Category = props => {
  const categoryId = props.match.params.id;
  const { data, loading, error } = useQuery(GET_THINGS, {
    variables: {
      category: categoryId || ''
    }
  });

  if (loading) return <p>Loading....</p>;
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
      <ThingFeed things={data.thingFeed.things} />
    </div>
  );
};

export default Category;
