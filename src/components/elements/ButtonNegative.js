import styled from 'styled-components';

export default styled.button`
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
  background: linear-gradient( to right, hsl(230deg 30% 60%), hsl(218deg 30% 50%) );

  &:hover {
    background: linear-gradient(
      to right,
      hsl(230deg 50% 60%),
      hsl(218deg 60% 60%)
    );
  }
`;
