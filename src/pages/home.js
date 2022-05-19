import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_THINGS } from '../client/query';
import ThingFeed from '../components/ThingFeed';
import ThingFeedLoader from '../components/loaders/thingFeedLoader';

const Home = props => {
  const { data, loading, error } = useQuery(GET_THINGS, {
    variables: {
      category: ''
    }
  });
  if (error) {
    console.log(error);
    return <p>Error query "ThingsFeed"</p>;
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

export default Home;
