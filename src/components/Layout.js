import React from 'react';
import Header from './Header';
import Categories from './Categories';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 9em;
  left: 0;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 9em);
  width: 100%;
  background: linear-gradient(
    119deg,
    hsl(218deg 15% 80%) 30%,
    hsl(70deg 82% 91%),
    hsl(47deg 68% 75%)
  );
  @media( max-width: 600px) {
    position: absolute;
  }
`;

const CategoriesContainer = styled.div`
  flex-basis: 12em;
  overflow-x: hidden;
  transition: all 0.2s ease-in;

  @media (max-width: 600px) {
    width: 8em;
  }
  @media (max-width: 400px) {
    flex-basis: 0px;
  }
`;

const Main = styled.main`
  min-height: 100px;
  border-left: 1px solid black;
  flex: 1 1 auto;
  overflow-y: scroll;
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
