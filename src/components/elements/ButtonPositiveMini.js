import styled from 'styled-components';

const ButtonPositiveMini = styled.button`
  flex: 1;
  height: 100%;
  padding: 0 0.6em;
  text-align: center;
  font-size: 1em;
  color: white;
  box-shadow: 0 0 3px black;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;

  background: linear-gradient(to right, hsl(47deg 40% 50%), hsl(40deg 40% 56%));
  &:hover {
    background: linear-gradient(
      to right,
      hsl(47deg 60% 50%),
      hsl(40deg 60% 50%)
    );
  }
`;

export default ButtonPositiveMini;