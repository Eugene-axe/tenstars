import React from 'react';
import styled from 'styled-components';
import Blink from './animationBlink';

const Wrapper = styled.div`
  --field-color: hsl(209deg 16% 88%);
  color: var(--field-color);
  overflow: hidden;
  position: relative;
  display: grid;
  background: linear-gradient(
    31deg,
    hsl(211deg 25% 82%) -48%,
    hsl(198deg 14% 93%) 63%,
    hsl(46deg 20% 60%) 200%
  );
  padding: 1em;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  grid-template-rows: 1fr 1fr 1fr 4fr 1fr 2em;
  column-gap: 1em;
  row-gap: 0.5em;
  grid-template-areas:
    ' path         preview '
    ' title        preview '
    ' rating       image   '
    ' description  image   '
    ' description  image   '
    ' footer       image   '
    'buttons       .       ';

  @media (max-width: 850px) {
    & {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr 6fr 2fr 1fr 3fr 1em 1fr;
      grid-template-areas:
        ' path        '
        ' title       '
        ' image       '
        ' preview     '
        ' rating      '
        ' description '
        ' footer      '
        ' buttons     ';
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      85deg,
      transparent 20%,
      #e8e8e8 50%,
      transparent 80%
    );
    animation: ${Blink} 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    z-index: 10;
  }
`;
const PathContainer = styled.div`
  grid-area: path;
  align-self: center;
  padding: 0.5em;
  border: 2px dashed var(--field-color);
  border-radius: 0.5em;
  font-size: 1.1rem;
  span {
    display: inline-block;
    width: 20%;
    height: 1em;
    background: var(--field-color);
  }
`;

const Title = styled.h2`
  grid-area: title;
  align-self: center;
  position: relative;
  height: 2em;

  span {
    display: inline-block;
    width: 40%;
    height: 1.5em;
    background: var(--field-color);
  }
  &::after {
    content: '';
    width: 100%;
    border-top: 2px solid var(--field-color);
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
  }
`;

const RatingContainer = styled.div`
  grid-area: rating;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2em;
`;

const Description = styled.div`
  grid-area: description;
  border: 2px dashed var(--field-color);
  border-radius: 0.5em;
  padding: 0.5em;
  min-height: 5em;

  & > div {
    height: 1em;
    margin-bottom: 1em;
    &:last-child {
      width: 40%;
    }
  }
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: space-between;

  span {
    display: inline-block;
    width: 25%;
    background: var(--field-color);
  }
`;

const Figure = styled.div`
  grid-area: image;
  background: var(--field-color);
  border: 1px solid var(--field-color);
  border-radius: 0.2em;
`;
const PreviewImage = styled.div`
  grid-area: preview;
  display: flex;

  & > div + div {
    margin-left: 0.5em;
  }
  & > div {
    background: var(--field-color);
    flex: 1;
    height: 100%;
    border: 1px solid var(--field-color);
    border-radius: 0.2em;
  }
`;
const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
  flex-direction: row;

  & > span {
    flex: 1;
    background: var(--field-color);
  }
`;

const thingLoader = props => {
  return (
    <Wrapper>
      <PathContainer>
        <span></span> /<span></span> /<span></span>
      </PathContainer>
      <Title>
        <span></span>
      </Title>
      <RatingContainer>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
        <span>*</span>
      </RatingContainer>
      <Description>
        <div class="description-row"></div>
        <div class="description-row"></div>
        <div class="description-row"></div>
      </Description>
      <Footer>
        <span></span>
        <span></span>
      </Footer>

      <Figure />
      <PreviewImage>
        <div class="pic1"></div>
        <div class="pic2"></div>
        <div class="pic3"></div>
      </PreviewImage>
      <Buttons>
        <span></span>
        <span></span>
        <span></span>
      </Buttons>
    </Wrapper>
  );
};


export default thingLoader;