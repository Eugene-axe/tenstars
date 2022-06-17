import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import CardThing from './CardThing';
import { ButtonPositive } from './elements';

const ThingFeed = ({ things, history }) => {
  return (
    <Feed>
      {things.map(thing => (
        <CardThing thing={thing} key={thing._id} />
      ))}
      <ButtonAddNew
        onClick={() => {
          history.push('/new');
        }}
      >
        &#9998;&#10010;
      </ButtonAddNew>
    </Feed>
  );
};

export default withRouter(ThingFeed);

const Feed = styled.div`
  display: grid;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-gap: 1rem;
  position: relative;
`;

const ButtonAddNew = styled(ButtonPositive)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  font-size: 1.5em;
  opacity: 0.8;
  display: none;
  @media (max-width: 450px) {
    display: block;
  }
`;
