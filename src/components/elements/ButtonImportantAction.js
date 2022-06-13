import React, { useState } from 'react';
import styled from 'styled-components';
import useAlert from '../../hooks/useAlert';
import { readyStyle , ButtonWrapper } from '../styled/additionalStyles';
import { NEUTRAL } from '../../const';

const ButtonDander = styled.button`
  ${ButtonWrapper}
  flex: 1;
  background: linear-gradient(to right, hsl(21deg 40% 50%), hsl(26deg 40% 56%));

  &:hover {
    background: linear-gradient(
      to right,
      hsl(21deg 60% 50%),
      hsl(26deg 60% 50%)
    );
  }
  ${({ ready }) => ready && readyStyle}
`;

export default function({ children, action }) {
  const [ready, setReady] = useState(false);
  const { setAlert } = useAlert();
  return (
    <ButtonDander
      ready={ready}
      onClick={() => {
        if (!ready) {
          setReady(true);
          setAlert('Press one-more time', NEUTRAL);
        } else {
          action();
        }
      }}
    >
      {children}
    </ButtonDander>
  );
}
