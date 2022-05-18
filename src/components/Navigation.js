import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonAsLink, ButtonNegative } from './elements';

const Nav = styled.nav`
  ul {
    display: flex;
    justify-content: start;
    flex-direction: row;
    list-style-type: none;
  }

  li {
    padding: 0 1em;
    transition: all 2s ease;
  }
  li .last {
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

  @media (max-width: 400px),
    screen and (max-width: 900px) and (max-height: 400px) {
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
        & .last {
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
`;

const ButtonToggle = styled(ButtonNegative)`
  display: none;
  @media (max-width: 400px),
    screen and (max-width: 900px) and (max-height: 400px) {
    display: block;
    width: 100%;
  }
`;

const Navigation = props => {
  const [isHide, setHide] = useState(true);
  const logOut = event => {
    localStorage.removeItem('token');
    props.client.resetStore();
    props.client.writeData({ data: { isLoggedIn: false } });
    props.history.push('/');
  };

  return (
    <Nav isHide={isHide}>
      <ButtonToggle
        onClick={() => {
          setHide(!isHide);
        }}
      >
        Menu
      </ButtonToggle>
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
