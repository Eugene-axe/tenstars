import React from 'react';
import styled from 'styled-components';
import FormLogin from '../components/FormLogin';
import logo from '../img/logo.svg';

const Wrapper = styled.div`
  background: center / cover no-repeat url(${logo}), linear-gradient(to right, hsl(218, 50%, 50%), hsl(46, 50%, 50%)) ;
  background-blend-mode: soft-light;
  width: 100vw;
  height: 100vh;
`;

const LayoutForm = props => {
  const { formType, signAction } = props;
  return (
    <Wrapper>
      <FormLogin formType={formType} signAction={signAction} />
    </Wrapper>
  );
};

export default LayoutForm;
