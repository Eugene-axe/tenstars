import styled from 'styled-components';
import Blink from '../loaders/animationBlink';


const ButtonLoad = styled.button`
  flex: 1;
  padding: 0.6em;
  text-align: center;
  font-size: 1em;
  color: hsla(0deg 0% 100% / 0.3);
  box-shadow: 0 0 3px black;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
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
    animation: ${Blink} 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
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
