import React from 'react';
import styled from 'styled-components';
import useAlert from '../hooks/useAlert';
import { POSITIVE, NEGATIVE, NEUTRAL } from '../const';
import { falls } from './styled/keyframes';
import { positiveTheme, negativeTheme, neutralTheme } from './styled/additionalStyles'

const Wrapper = styled.div`
  ${({ theme }) =>
    theme === POSITIVE
      ? positiveTheme
      : theme === NEGATIVE
      ? negativeTheme
      : neutralTheme};
  position: fixed;
  z-index: 100;
  bottom: 10%;
  left: -100%;
  left: 0;
  width: 30vh;
  min-width: 150px;
  border-top-right-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  border-left: none;
  text-shadow: 0 0 1px black;
  font-size: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  transition: top 0.3s cubic-bezier(0.03, 0.77, 0.69, 1.52);
  animation: ${falls} 1.5s ease-out;
  animation-fill-mode: forwards;
`;

const Content = styled.div`
  margin-left: 10%;
  padding: 0.5em 0em 0.5em 1em;
  overflow-wrap: nowrap;
`;
const Symbol = styled.div`
  font-size: 1.6em;
  padding: 0 0.35em 0 0.5em;
`;

const Popup = props => {
  const { message, theme } = useAlert();

  if (message && theme) {
    return (
      <Wrapper theme={theme}>
        <Content>{message}</Content>
        <Symbol>
          {theme === POSITIVE
            ? '✓'
            : theme === NEGATIVE
            ? '✗'
            : '!'}
        </Symbol>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

export default Popup;
