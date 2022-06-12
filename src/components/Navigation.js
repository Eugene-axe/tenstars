import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import { ButtonAsLink, ButtonNegative } from './elements';
import { SET_IS_LOGGED_IN } from '../client/cache';
import useAlert from '../hooks/useAlert';
import { NEUTRAL } from '../const';

const Nav = styled.nav`
  ul {
    position: relative;
    display: flex;
    justify-content: start;
    flex-direction: row;
    list-style-type: none;
  }

  li {
    padding: 0 1em;
    transition: all 2s ease;
  }
  li.last {
    margin-left: auto;
  }
  li a,
  li button {
    text-decoration: none;
    font-size: 1.3em;
    color: hsl(40, 80%, 80%);
    display: block;
  }
  li a:hover {
    text-decoration: underline;
    color: hsl(40, 80%, 70%);
  }

  @media (max-width: 450px) {
    position: relative;
    ul {
      display: ${props => (props.isHide ? 'none' : 'flex')};
      position: absolute;
      top: 2em;
      flex-direction: column;
      width: 100%;
      border-bottom: 1px solid hsl(230deg 30% 60%);
      border-bottom-left-radius: 0.2em;
      border-bottom-left-radius: 0.2em;
      li {
        background: linear-gradient(
          to right,
          hsl(221deg 29% 79%),
          hsl(226deg 29% 72%)
        );
        cursor: pointer;
        &:hover {
          background: linear-gradient(
            to right,
            hsl(221deg 40% 70%),
            hsl(226deg 29% 72%)
          );
        }
        &.last {
          margin: 0;
        }
        & > * {
          color: #fff;
          font-size: 1em;
        }
      }
      li + li {
        border-top: 1px solid hsl(230deg 30% 60%);
      }
    }
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    position: relative;
    display: flex;
    flex-direction: column;
    ul {
      background: linear-gradient(
        to right,
        hsl(221deg 29% 79%),
        hsl(226deg 29% 72%)
      );
      display: ${props => (props.isHide ? 'none' : 'flex')};
      font-size: 0.8em;
      position: absolute;
      width: 100%;
      top: 2px;
      border-bottom: 1px solid black;
    }
  }
`;

const ButtonToggle = styled(ButtonNegative)`
  display: none;
  @media (max-width: 450px) {
    display: block;
    width: 100%;
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    align-self: center;
    display: block;
    margin-top: -2.2em;
    background: transparent;
  }
`;

const Navigation = props => {
  const client = useApolloClient();
  const [isHide, setHide] = useState(true);
  const { setAlert } = useAlert();
  const logOut = event => {
    localStorage.removeItem('token');
    setAlert('Пока! Заходи еще!😩', NEUTRAL);
    client.resetStore();
    client.writeQuery({
      query: SET_IS_LOGGED_IN,
      data: { isLoggedIn: false }
    });
    props.history.push('/');
  };

  return (
    <Nav
      isHide={isHide}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHide(true);
      }}
    >
      <ButtonToggle
        onClick={() => {
          setHide(!isHide);
        }}
      >
        Menu
      </ButtonToggle>
      <ul
        onClick={() => {
          setHide(true);
        }}
      >
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
          <li className="last">
            <ButtonAsLink onClick={logOut}>Log out</ButtonAsLink>
          </li>
        ) : (
          <>
            <li className="last">
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
