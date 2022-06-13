import styled from 'styled-components';
import { ButtonWrapper } from '../styled/additionalStyles';

const ButtonSecondary = styled.button`
  ${ButtonWrapper}
  flex: 1;
  ${'' /* background: linear-gradient(to right, hsl(62deg 76% 67%), hsl(48deg 32% 60%)); */}
  background: var(--bg-secondary);

  &:hover {
    background: linear-gradient(
      to right,
      hsl(62deg 84% 57%),
      hsl(48deg 42% 50%)
    );
  }
  &:disabled {
    background: linear-gradient(
      to right,
      hsl(47deg 24% 70%),
      hsl(40deg 25% 65%)
    );
  }
`;

export default ButtonSecondary;
