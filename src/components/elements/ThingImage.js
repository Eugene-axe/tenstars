import React from 'react';
import styled from 'styled-components';
import defaultThing from '../../img/picture.svg';

const ImageWrapper = styled.figure`
  width: 100%;
  height: 100%;
  position: relative;

  figcaption {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 1.5em;
    color: hsl(80 50% 50%);
    text-shadow: 0 0 2px hsl(240deg 63% 25%);
  }
`;

const Image = styled.div`
  height: 100%;
  background-image: url(${props => props.image || defaultThing});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => (props.image ? 'cover' : 'contain')};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ThingImage = props => {
  return (
    <ImageWrapper>
      <Image image={props.image} />
      {props.categoryName && <figcaption>{props.categoryName}</figcaption>}
    </ImageWrapper>
  );
};

export default ThingImage;
