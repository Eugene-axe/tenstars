import React from 'react';
import styled from 'styled-components';

import SceletCard from './SceletCard';

const Feed = styled.div`
  display: grid;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-gap: 1rem;
`;

const ThingFeedLoader = ({ count }) => {
  const things = new Array(+count).fill(null);
  return (
    <Feed>
      {things.map((thing, i) => (
        <SceletCard key={i} />
      ))}
    </Feed>
  );
};

export default ThingFeedLoader;
