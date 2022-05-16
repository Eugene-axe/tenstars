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
  min-width: 500px;
  width: 100%;
  height: 9em;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  background: linear-gradient(to right, hsl(218, 50%, 50%), hsl(46, 50%, 50%));
`;

const Cap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const Img = styled.img`
  height: 80px;
   @media (max-width: 600px) {
     height: 60px;
   }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  * {
    margin: 0.2em;
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
