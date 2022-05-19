import styled, { keyframes } from 'styled-components';

const loading = keyframes`
0% {
  background: linear-gradient(
    125deg,
    hsl(218deg 15% 60%) 15%,
    hsl(218deg 22% 86%) 40%,
    hsl(218deg 15% 70%) 65%
  )}
  50% {
  background: linear-gradient(
    125deg,
    hsl(218deg 15% 60%) 30%,
    hsl(218deg 22% 86%) 60%,
    hsl(218deg 15% 70%) 85%
  )}
  100% {
    background: linear-gradient(
    125deg,
    hsl(218deg 15% 60%) 45%,
    hsl(218deg 22% 86%) 80%,
    hsl(218deg 15% 70%) 105%
  );}
`;

const loading2 = keyframes`
 0% {
   background-position: left;
 }
 50% {
   background-position: center;
 }
 100% {
   background-position: right;
 }
`

const ButtonLoad = styled.button`
  flex: 1;
  padding: 0.6em;
  text-align: center;
  font-size: 1em;
  color: white;
  box-shadow: 0 0 3px black;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  transition: background 0.2s ease-in;

  background: linear-gradient(
    125deg,
    hsl(218deg 15% 60%) 15%,
    hsl(218deg 22% 86%) 40%,
    hsl(218deg 15% 70%) 65%
  );
  animation: ${loading2} 1s infinite ease-in-out;

`;

export default ButtonLoad;
