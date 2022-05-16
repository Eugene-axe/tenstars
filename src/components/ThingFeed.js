import React from 'react';
import styled from 'styled-components';

import CardThing from './CardThing';

const Feed = styled.div`
  display: grid;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-gap: 1rem;
`;

const ThingFeed = ({ things }) => {
  return (
    <Feed>
      {things.map(thing => (
        <CardThing thing={thing} key={thing._id}/>
      ))}
    </Feed>
  );
};

export default ThingFeed;
