import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonAsLink } from './elements';

const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: start;
    flex-direction: row;
    list-style-type: none;
  }

  li {
    padding: 0 1em;
  }
  li a,
  li button {
    text-decoration: none;
    font-size: 1.3em;
    color: hsl(40, 80%, 80%);
  }
  li a:hover {
    text-decoration: underline;
    color: hsl(40, 80%, 70%);
  }
`;

const Navigation = props => {
  const logOut = event => {
    localStorage.removeItem('token');
    props.client.resetStore();
    props.client.writeData({ data: { isLoggedIn: false } });
    props.history.push('/');
  };

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my">My Things</Link>
        </li>
        <li>
          <Link to="/new">New</Link>
        </li>
        {props.isLoggedIn ? (
          <li style={{ marginLeft: 'auto' }}>
            <ButtonAsLink onClick={logOut}>Log out</ButtonAsLink>
          </li>
        ) : (
          <>
            <li style={{ marginLeft: 'auto' }}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default withRouter(Navigation);
