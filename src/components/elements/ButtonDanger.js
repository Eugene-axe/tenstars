import styled from 'styled-components';
import { ButtonWrapper } from '../styled/additionalStyles';

export default styled.button`
  ${ButtonWrapper}
  flex: 1;
  background: var(--bg-danger);

  &:hover {
    background: linear-gradient(
      to right,
      hsl(21deg 60% 50%),
      hsl(26deg 60% 50%)
    );
  }
`;
