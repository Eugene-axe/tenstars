import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';
import { NEW_CATEGORY } from '../client/mutation';
import BreadCrumbsForForm from './BreadCrumpsForForm';
import ButtonPositiveMini from './elements/ButtonPositiveMini';
import useAlert from '../hooks/useAlert';
import useValidate from '../hooks/useValidate';
import { NEGATIVE } from '../const';
import { invalidError, loaderBlinkBefore } from './styled/additionalStyles';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
  * {
    trnsition: all 0.2s ease;
  }
`;
const Path = styled.div`
  flex: 1;
`;
const Selection = styled.div`
  flex: 1;
  position: relative;
  &:hover {
    background-color: hsl(35deg 40% 95%);
  }
`;
const LabelContainer = styled.div`
  height: 1.5em;
  width: 100%;
`;
const InputNew = styled.div`
  flex: 1;
  display: flex;
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
      ${({ error }) => error && invalidError}
    }
  }
`;
const Label = styled.div`
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
  max-height: calc(1.5em * 4);
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
    border-top: 1px solid rgba(100, 100, 100, 0.3);
    &:hover {
      background-color: hsl(35deg 40% 85%);
    }
  }
`;

const arrayTrimmedByValue = (value, array) => {
  const index = array.indexOf(value);
  console.group('arrayTrimmedByValue')
  console.log(array);
  trimArray = array.slice(0 , index+1); 
  console.log('index ', index);
  console.log(trimArray);
  console.groupEnd();
  return trimArray;
};

const CategorySelection = props => {
  const lastIdCategories = props.categories[props.categories.length - 1];
  const [isHide, setHide] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const titleCat = useRef();
  const wrapper = useRef();
  useEffect(() => {
    !isHide && wrapper.current.focus();
  });
  const { setAlert } = useAlert();
  const { validate, errors, isPermit } = useValidate();
  const [newCategory] = useMutation(NEW_CATEGORY, {
    onCompleted: data => {
      props.setCategories([...props.categories, data.newCategory._id]);
    },
    refetchQueries: [
      {
        query: GET_CATEGORY,
        variables: { id: lastIdCategories }
      }
    ]
  });
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: lastIdCategories }
  });

  const onClickAdd = event => {
    if (!newTitle) {
      titleCat.current.focus();
      return;
    }
    if (!isPermit) {
      setAlert('Incorrect category name', NEGATIVE);
      return;
    }
    newCategory({
      variables: { directAncestor: lastIdCategories, title: newTitle }
    });
    setNewTitle('');
    setHide(true);
  };
  if (error)
    return <p>Error at same downloadind information about category! </p>;

  return (
    <Wrapper
      ref={wrapper}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHide(true);
      }}
    >
      <Path>
        <BreadCrumbsForForm
          path={loading ? [''] : props.categories}
          trimmCats={id => {
            const trimmedCats = arrayTrimmedByValue(id, props.categories);
            console.log(trimmedCats);
            props.setCategories(trimmedCats);
          }}
        />
      </Path>
      <Selection
        tabIndex={0}
        onClick={event => {
          isHide && setHide(false);
          wrapper.current.focus();
        }}
      >
        <LabelContainer>
          {!isHide && !loading ? (
            <InputNew error={errors.titleCat}>
              <input
                type="text"
                name="titleCat"
                placeholder="Enter new category"
                value={newTitle}
                ref={titleCat}
                onChange={event => {
                  setNewTitle(event.target.value);
                }}
                onBlur={event => {
                  validate({
                    name: event.target.name,
                    value: event.target.value,
                    conditions: {
                      require: true,
                      minLength: 3,
                      maxLength: 20
                    }
                  });
                }}
              />
              <ButtonPositiveMini type="button" onClick={onClickAdd}>
                +
              </ButtonPositiveMini>
            </InputNew>
          ) : (
            <Label wait={loading}>Choose category</Label>
          )}
        </LabelContainer>
        {!isHide && !loading && (
          <Dropdown>
            <ul>
              {data.category.descendants.map(cat => (
                <li
                  key={cat._id}
                  onClick={() => {
                    props.setCategories([...props.categories, cat._id]);
                  }}
                >
                  {cat.title}
                </li>
              ))}
            </ul>
          </Dropdown>
        )}
      </Selection>
    </Wrapper>
  );
};

export default CategorySelection;
