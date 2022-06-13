import styled from 'styled-components';
import { ButtonWrapper } from '../styled/additionalStyles';

const ButtonPositive = styled.button`
  ${ButtonWrapper}
  flex: 1;
  border: none;
  outline: none;

  background : var(--bg-positive);
  &:hover {
    background: linear-gradient(
      to right,
      hsl(47deg 60% 50%),
      hsl(40deg 60% 50%)
    );
  }
  &:disabled {
    background: linear-gradient(to right,hsl(47deg 24% 70%),hsl(40deg 25% 65%));
  }
`;

export default ButtonPositive;