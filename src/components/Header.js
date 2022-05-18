import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Navigation from './Navigation';
import logo from '../img/logo.svg';
import { ME, IS_LOGGED_IN } from '../client/query';

const HeaderPage = styled.header`
  border-bottom: 2px solid black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 9em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5em;
  padding-bottom: 0;
  background: linear-gradient(to right, hsl(218, 50%, 50%), hsl(46, 50%, 50%));
  @media (max-width: 800px) {
    height: 7em;
    padding: 2px 0em 0;
  }
  @media (max-width: 450px) {
    z-index: 10;
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    height: 3.5em;
    padding: 0;
    z-index: 10;

  }
`;

const Cap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 800px) {
    font-size: 0.9em;
    padding: 0 0.5em;
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    font-size: 0.65em;
  }
`;
const Img = styled.img`
  height: 5em;
  @media (max-width: 800px) {
    height: 3.75;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    margin: 0.2em;
  }
  @media (max-width: 450px) {
    font-size: 0.8em;
    * {
      margin: 0;
    }
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    * {
      margin: 0;
    }
  }
`;

const Welcome = props => {
  const { data, client } = useQuery(ME, {
    onCompleted: data => {
      client.writeData({ data });
    }
  });
  return <h3>Welcome, {data?.me ? data.me.name : 'Guest'}!</h3>;
};

const Header = props => {
  const { data, client } = useQuery(IS_LOGGED_IN);

  return (
    <HeaderPage>
      <Cap>
        <Img src={logo} alt="Thing Rating Logo" />
        <Title>
          <h1>Things Rating</h1>
          {data.isLoggedIn ? <Welcome /> : <h3>{''}</h3>}
        </Title>
      </Cap>
      <Navigation client={client} isLoggedIn={data.isLoggedIn} />
    </HeaderPage>
  );
};

export default Header;
