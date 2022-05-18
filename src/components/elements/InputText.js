import styled from 'styled-components';

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid rgba(40, 40, 40, 0.4);
  outline: none;
  padding: 0.5em 1em 0.2em;
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  transition: all 0.2s ease;

  &:hover {
    background-color: hsl(35deg 40% 95%);
  }

  &:focus {
    background-color: hsl(35deg 40% 85%);
    border-color: rgba(0, 0, 0, 0.8);
  }
`;

export default InputText;
