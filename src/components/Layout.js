import React from 'react';
import Header from './Header';
import Categories from './Categories';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 9em;
  left: 0;
  width: 100%;
  height: calc(100% - 9em);
  display: flex;
  flex-direction: row;
  background: linear-gradient(
    119deg,
    hsl(218deg 15% 80%) 30%,
    hsl(70deg 82% 91%),
    hsl(47deg 68% 75%)
  );
  @media (max-width: 800px) {
    top: 6em;
    height: (100% -6em);
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const CategoriesContainer = styled.div`
  flex: 0 0 12em;
  overflow-x: hidden;
  transition: all 0.2s ease-in;

  @media (max-width: 600px) {
    flex-basis: 8em;
  }
  @media (max-width: 400px) {
    flex-basis: auto;
    width: 100%;
    overflow-x: visible;
  }
`;

const Main = styled.main`
  min-height: 100px;
  border-left: 1px solid black;
  flex: 1 1 auto;
  overflow-y: scroll;
  padding-bottom: 10em;
  @media (max-width: 400px) {
    border-left: 0;
    border-top: 1px solid black;
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
