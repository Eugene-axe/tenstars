import React, { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  * {
    width: 100%;
  }
`;
const RangeInput = styled.input`
  padding: 1em;
  appearance: none;
  background: transparent;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: linear-gradient(
      to right,
      hsl(218, 50%, 50%),
      hsl(210, 40%, 60%)
    );
    border: 1px solid black;
    border-radius: 0.3em;
    height: 2em;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: linear-gradient(50deg, hsl(60, 50%, 50%), hsl(46, 40%, 80%));
    border: 1px solid black;
    border-radius: 0.3em;
    width: 10%;
    height: 100%;
  }
  &:focus::-webkit-slider-runnable-track {
    box-shadow: 0 0 10px rgba(50, 50, 50, 0.5);
  }
`;
const Value = styled.div`
  min-width: 2em;
  flex: 1;
  padding: 0.8rem;
  font-size: 2em;
  text-align: center;
`;

const RangeRating = props => {
  const [value, setValue] = useState(props.value || 5);
  const onChange = event => {
    setValue(event.target.value);
  };
  return (
    <Wrapper>
      <RangeInput
        type="range"
        name="rating"
        id="thing-rating"
        max="10"
        min="1"
        step="1"
        value={props.value}
        onChange={onChange}
      />
      <Value>{value}</Value>
    </Wrapper>
  );
};

export default RangeRating;
