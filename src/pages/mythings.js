import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_THINGS } from '../client/query';
import ThingFeed from '../components/ThingFeed';
import ThingFeedLoader from '../components/loaders/thingFeedLoader';

const MyThings = props => {
  const { data, loading, error } = useQuery(GET_MY_THINGS, {
    variables: {
      category: ''
    }
  });

  if (error) {
    return <p>Error query "ThingsFeed"</p>;
  }

  return (
    <div>
      {loading ? (
        <ThingFeedLoader count={10} />
      ) : (
        <ThingFeed things={data.myThingFeed.things} />
      )}
    </div>
  );
};

export default MyThings;
