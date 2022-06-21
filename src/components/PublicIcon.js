import React from 'react';
import styled from 'styled-components';
import Public from '../img/public.svg';
import OnlyMe from '../img/only_me.svg';

const PublicIcon = props => {
  return <Wrapper public={props.public}></Wrapper>;
};

export default PublicIcon;

const Wrapper = styled.div`
  opacity: 0.7;
  width: 100%;
  height: 100%;
  background-image: url(${props => (props.public ? Public : OnlyMe)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.7));
`;
