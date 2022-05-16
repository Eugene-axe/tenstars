import React from 'react';
import { useQuery} from '@apollo/client';
import { GET_MY_THINGS } from '../client/query';
import ThingFeed from '../components/ThingFeed';

const Home = props => {
  const { data, loading, error } = useQuery(GET_MY_THINGS, {
    variables: {
      category: ''
    }
  });

  if (loading) return <p>Loading....</p>;
  if (error) {
    return <p>Error query "ThingsFeed"</p>;
  }

  return (
    <div>
      <ThingFeed things={data.myThingFeed.things} />
    </div>
  );
};

export default Home;