import { keyframes } from 'styled-components';

export const puls = keyframes`
    0%,
    100% {
      outline: 2px solid hsla(0deg 50% 50% / 0.1);
    }
    50% {
      outline: 2px solid hsla(0deg 50% 50% / 0.8);
    }
`;

export const pulsOpacity = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

export const blink = keyframes`
0% {
          left: -150px;
      } 
      70%, 100% {
          left: 100%;
      }
`;

export const falls = keyframes`
 0% {
      left: -100%;
      opacity: 0;
    }
    10% {
      opacity: 0;
    }
    30%,
    80% {
      left: 0;
      opacity: 1;
    }
    100% {
      left: -10%;
      opacity: 0;
    }`;
