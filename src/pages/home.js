import React from "react";
import { useQuery } from "@apollo/client";
import { GET_THINGS } from "../client/query";
import ThingFeed from "../components/ThingFeed";

const Home = (props) => {
  const { data, loading, error } = useQuery(GET_THINGS, {
    variables: {
      category: "",
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Error query "ThingsFeed"</p>;
  }

  return (
    <div>
      <ThingFeed things={data.thingFeed.things} />
    </div>
  );
};

export default Home;
