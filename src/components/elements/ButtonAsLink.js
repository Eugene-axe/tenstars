import styled from 'styled-components';

export default styled.button`
  background: none;
  color: hsl(40, 80%, 80%);
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer

    &:hover {
    text-decoration: underline;
    color: hsl(40, 80%, 70%);
    }
`;

