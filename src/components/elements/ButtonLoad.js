import styled from 'styled-components';
import { blink } from '../styled/keyframes';
import { ButtonWrapper } from '../styled/additionalStyles';

const ButtonLoad = styled.button`
  ${ButtonWrapper}
  flex: 1;
  background: linear-gradient(to right, hsl(47deg 14% 75%), hsl(40deg 15% 70%));
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -250px;
    top: 0;
    height: 100%;
    width: 250px;
    background: linear-gradient(
      85deg,
      transparent 20%,
      hsl(180deg 12% 85% / 50%) 50%,
      transparent 80%
    );
    animation: ${blink} 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes load {
    0% {
      left: -150px;
    }
    70%,
    100% {
      left: 100%;
    }
  }
`;

export default ButtonLoad;
