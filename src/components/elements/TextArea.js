import styled from 'styled-components';

const TextArea = styled.textarea`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  padding: 0.4em 0 0.2em 2em;
  resize: none;

  &:focus {
    background-color: rgba(220, 220, 220, 0.3);
  }
`;

export default TextArea;