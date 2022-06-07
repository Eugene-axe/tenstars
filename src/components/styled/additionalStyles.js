import { css } from 'styled-components';
import { puls, pulsOpacity } from './keyframes';

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