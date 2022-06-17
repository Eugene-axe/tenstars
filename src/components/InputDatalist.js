import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useAlert from '../hooks/useAlert';
import useValidate from '../hooks/useValidate';
import { NEGATIVE } from '../const';
import { ButtonPositive } from './elements';
import {
  invalidError,
  loaderBlinkBefore,
  categoriesInputDataListAddStyle
} from './styled/additionalStyles';

const InputDatalist = props => {
  const {
    loading,
    list = [],
    inputPlaceholder,
    actionWithReturnValue,
    actionWithNewValue,
    actionIcon,
    maxRows,
    validateConditions
  } = props;

  const { setAlert } = useAlert();
  const { validate, errors, isPermit } = useValidate();

  const wrapper = useRef();
  const titleCat = useRef();

  const [isHide, setHide] = useState(true);
  const [newValue, setNewValue] = useState('');

  const actionSubmitButton = () => {
    validate({
      name: 'titleCat',
      value: newValue,
      conditions: validateConditions
    });
    if (!isPermit || !newValue) {
      titleCat.current.focus();
      setAlert("Can't save this value", NEGATIVE);
      return;
    }
    setNewValue('');
    setHide(true);
    actionWithNewValue(newValue);
  };
  return (
    <Wrapper
      tabIndex={0}
      ref={wrapper}
      onClick={event => {
        isHide && setHide(false);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHide(true);
      }}
    >
      <LabelContainer>
        <InputNew error={errors.titleCat}>
          <input
            type="text"
            id="titleCat"
            name="titleCat"
            autoComplete="off"
            placeholder={inputPlaceholder}
            value={newValue}
            ref={titleCat}
            onChange={event => {
              setNewValue(event.target.value);
            }}
            onBlur={event => {
              validate({
                name: 'titleCat',
                value: event.target.value,
                conditions: validateConditions || {}
              });
            }}
            onFocus={() => {
              validate({
                name: 'titleCat',
                value: event.target.value,
                conditions: {}
              });
            }}
          />
          <ButtonPositiveMini type="button" onClick={actionSubmitButton}>
            {actionIcon}
          </ButtonPositiveMini>
        </InputNew>
      </LabelContainer>
      {!isHide && !loading && (
        <Dropdown maxRows={maxRows}>
          <ul>
            {list
              .filter(item =>
                item.title.toLowerCase().includes(newValue.toLowerCase())
              )
              .map(item => (
                <li
                  key={item._id}
                  onClick={() => {
                    setHide(true);
                    actionWithReturnValue(item);
                  }}
                >
                  {item.title}
                </li>
              ))}
          </ul>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default InputDatalist;

const Wrapper = styled.div`
  flex: 1;
  position: relative;
  &:hover {
    background-color: hsl(35deg 40% 95%);
  }
  ${categoriesInputDataListAddStyle}
`;
const LabelContainer = styled.div`
  font-size: 1rem;
  height: 1.5em;
  width: 100%;
  position: relative;
`;
const InputNew = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  input {
    border: none;
    outline: none;
    height: 100%;
    padding-left: 1em;
    flex: 9;
    &:focus {
      background-color: hsl(35deg 40% 85%);
    }
    &#titleCat {
      ${({ error }) => error && invalidError}
    }
  }
`;

const ButtonPositiveMini = styled(ButtonPositive)`
  height: 100%;
  padding: 0 0.6em;
`;

const Label = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding-left: 1em;
  &:after {
    content: ' \\25BC';
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
  }
  opacity: ${({ wait }) => (wait ? '0.5' : '1')}
    ${({ wait }) => wait && loaderBlinkBefore};
`;
const Dropdown = styled.div`
  max-height: calc(1.5em * ${props => props.maxRows || 3});
  overflow-y: auto;
  width: 100%;
  position: absolute;
  top: 1.5em;
  left: 0;
  background-color: hsl(35deg 40% 95%);
  border: 1px solid rgba(100, 100, 100, 0.3);

  & ul li {
    height: 1.5em;
    padding-left: 1em;
    font-size: 1rem;
    border-top: 1px solid rgba(100, 100, 100, 0.3);
    &:hover {
      background-color: hsl(35deg 40% 85%);
    }
  }
`;
