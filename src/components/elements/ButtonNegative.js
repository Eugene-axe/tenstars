import styled from 'styled-components';
import { ButtonWrapper } from '../styled/additionalStyles';

export default styled.button`
  ${ButtonWrapper}
  flex: 1;
  background: var(--bg-negative);

  &:hover {
    background: linear-gradient(
      to right,
      hsl(230deg 50% 60%),
      hsl(218deg 60% 60%)
    );
  }
`;
