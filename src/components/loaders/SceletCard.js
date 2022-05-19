import React from 'react';
import styled from 'styled-components';
import Blink from './animationBlink';

const SceletCard = props => {
  return (
    <Card>
      <ImageContainer>
        <ThingImage />
      </ImageContainer>
      <List>
        <Title />
        <Rating>
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
        </Rating>
        <Description>
          <DescriptionRow />
          <DescriptionRow />
          <DescriptionRow />
        </Description>
        <Info>
          <span></span>
          <span></span>
        </Info>
        <ButtonMore>
          <span></span>
        </ButtonMore>
      </List>
    </Card>
  );
};

const Card = styled.div`
  --field-color: hsl(209deg 16% 88%);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 2px solid var(--field-color);
  border-radius: 0.5em;
  box-shadow: 2px 2px 3px var(--field-color);
  background: linear-gradient(
    31deg,
    hsl(211deg 25% 82%) -48%,
    hsl(198deg 14% 93%) 63%,
    hsl(46deg 20% 60%) 200%
  );
  overflow: hidden;

  & * {
    z-index: 10;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -300px;
    top: 0;
    height: 100%;
    width: 250px;
    background: linear-gradient(
      85deg,
      transparent 15%,
      hsl(206deg 10% 80%) 50%,
      transparent 85%
    );
    animation: ${Blink} 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 5;
  }
`;
const ImageContainer = styled.div`
  flex: 1 0 50%;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  overflow: hidden;
  box-shadow: 0 -2px 7px var(--field-color);
  position: relative;
`;
const ThingImage = styled.div`
  position: absolute;
  bottom: 2em;
  right: 2px;
  width: 30%;
  height: 1.5em;
  background-color: var(--field-color);
`;
const List = styled.ul`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;
  padding: 0.5em;
  border-radius: 0.5em;
  border-color: var(--field-color);

  li + li {
    margin-top: 0.5em;
  }
`;
const Title = styled.li`
  height: 1.5em;
  width: 40%;
  background-color: var(--field-color);
`;
const Description = styled.li`
  border: 2px dashed var(--field-color);
  border-radius: 0.5em;
  padding: 0.5em;
  flex: 3;
`;
const DescriptionRow = styled.div`
  margin: 0.5em;
  height: 1em;
  width: 86%;
  background-color: var(--field-color);

  &:last-child {
    width: 54%;
  }
`;
const Rating = styled.li`
  display: flex;
  align-items: center;
  color: var(--field-color);
  justify-content: space-between;
  font-size: 1em;
`;
const Info = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;

  * {
    background-color: var(--field-color);
    width: 25%;
    height: 1em;
  }
`;
const ButtonMore = styled.li`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 0 1px var(--field-color);
  margin: 0 -0.5em -0.5em -0.5em;

  span {
    display: block;
    width: 5em;
    height: 1em;
    margin: 0 auto;
    background-color: var(--field-color);
  }
`;

export default SceletCard;
