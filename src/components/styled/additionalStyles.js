import { css } from 'styled-components';
import { puls, pulsOpacity, blink } from './keyframes';

export const invalidError = css`
  border-color: hsla(0deg 50% 50% / 0.4);
  outline: 2px solid red;
  background: hsla(0deg 50% 50% / 0.4);
  animation: ${puls} 1.5s linear infinite;
`;

export const readyStyle = css`
  animation: ${pulsOpacity} 1.5s linear infinite;
`;

export const positiveTheme = css`
  --theme-color: hsl(46deg 48% 50%);
  border: 2px solid var(--theme-color);
  box-shadow: inset 0 0 2px var(--theme-color);
  background: linear-gradient(
    to right,
    hsla(46deg 48% 50%/ 0.4),
    hsla(46deg 48% 50% / 0.7),
    hsla(46deg 48% 50% / 0.7)
  );
  color: hsl(46deg 48% 30%);
`;

export const negativeTheme = css`
  --theme-color: hsl(218deg 47% 50%);
  border: 2px solid var(--theme-color);
  box-shadow: inset 0 0 2px var(--theme-color);
  background: linear-gradient(
    to right,
    hsla(218deg 47% 50%/ 0.4),
    hsla(218deg 47% 50% / 0.7),
    hsla(218deg 47% 50% / 0.7)
  );
  color: hsl(218deg 47% 40%);
`;

export const neutralTheme = css`
  --theme-color: hsl(170deg 7% 82%);
  border: 2px solid var(--theme-color);
  box-shadow: inset 0 0 2px var(--theme-color);
  background: linear-gradient(
    to right,
    hsla(170deg 7% 82% / 0.4),
    hsla(170deg 7% 82% / 0.7),
    hsla(170deg 7% 82% / 0.7)
  );
  color: hsl(170deg 7% 50%);
`;

export const loaderBlinkBefore = css`
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      85deg,
      transparent 20%,
      #e8e8e8 50%,
      transparent 80%
    );
    animation: ${blink} 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const ButtonWrapper = css`
  padding: 0.6em;
  text-align: center;
  font-size: 1em;
  color: white;
  box-shadow: 0 0 3px black;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
`;

export const categoriesInputDataListAddStyle = css``;
