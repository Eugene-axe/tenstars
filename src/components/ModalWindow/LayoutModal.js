import React from 'react';
import styled from 'styled-components';
import { ButtonNegative } from '../elements';

const ModalImg = ({ children }) => {
  return (
    <Layout>
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

export default ModalImg;

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 1em;
  height: 100%;
`;
