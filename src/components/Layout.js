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
  @media (max-width: 450px) {
    flex-direction: column;
  }
  @media (max-width: 800px) and (min-height: 450px) , (max-width: 450px) and (max-height: 450px) {
    top: 7em;
    height: calc(100% - 7em);
  }
  @media (orientation: landscape) and (max-height: 450px) and (min-width: 450px) {
    top: 3.5em;
    height: calc(100% - 3.5em);
  }
`;

const CategoriesContainer = styled.div`
  flex: 0 0 12em;
  overflow-x: hidden;
  transition: all 0.2s ease-in;

  @media (max-width: 600px) {
    flex-basis: 8em;
  }
  @media (max-width: 450px) {
    flex-basis: auto;
    width: 100%;
    overflow-x: visible;
  }
`;

const Main = styled.main`
  min-height: 100px;
  border-left: 1px solid black;
  flex: 1 1 auto;
  overflow-y: auto;
  ${'' /* padding-bottom: 1em; */}
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
