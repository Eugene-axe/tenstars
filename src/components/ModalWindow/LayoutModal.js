import React from 'react';
import styled from 'styled-components';

const ModalImg = ({ children, opacity, time }) => {
  console.log('opacity', `${opacity} + 8`);
  console.log('time', `${time} + 8`);

  return (
    <Layout opacity={opacity} time={time}>
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
  transition: opacity ${({ time }) => time / 1000}s ease-in;
  opacity: ${({ opacity }) => opacity};
`;

const Wrapper = styled.div`
  padding: 1em;
  height: 100%;
`;
