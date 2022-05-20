import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';
import { NEW_CATEGORY } from '../client/mutation';
import BreadCrumbsForForm from './BreadCrumpsForForm';
import ButtonPositiveMini from './elements/ButtonPositiveMini';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
    }
  }
`;
const Label = styled.div`
  position: relative;
  &:after {
    content: ' \\25BC';
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-50%);
  }
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
const CategorySelection = props => {
  const basisCatId = process.env.CAT_ID;
  const [isOpenSelector, setOpenSelector] = useState(false);
  const [idCurCat, setIdCurCat] = useState(basisCatId);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory] = useMutation(NEW_CATEGORY, {
    onCompleted: data => {
      setIdCurCat(data.newCategory._id);
    },
    refetchQueries: [
      {
        query: GET_CATEGORY,
        variables: { id: idCurCat }
      }
    ]
  });
  const { data, loading, error, client } = useQuery(GET_CATEGORY, {
    variables: { id: idCurCat },
    onCompleted: data => {
      props.setValues([...data.category.ancestors, data.category._id]);
    }
  });
  if (loading) return <p>Information about this category downloadind... </p>;
  if (error)
    return <p>Error at same downloadind information about category! </p>;

  return (
    <Wrapper>
      <Path>
        <BreadCrumbsForForm
          path={[...data.category.ancestors, data.category._id]}
          setId={setIdCurCat}
        />
      </Path>
      <Selection
        onMouseLeave={() => {
          // setOpenSelector(false);
        }}
      >
        <LabelContainer>
          {isOpenSelector ? (
            <InputNew>
              <input
                type="text"
                placeholder="Enter new category"
                value={newTitle}
                onChange={event => {
                  setNewTitle(event.target.value);
                }}
              />
              <ButtonPositiveMini
                type="button"
                onClick={() => {
                  // newCategory(newTitle);
                  newCategory({
                    variables: { ancestor: idCurCat, title: newTitle }
                  });
                  setNewTitle('');
                }}
              >
                +
              </ButtonPositiveMini>
            </InputNew>
          ) : (
            <Label
              onClick={() => {
                setOpenSelector(true);
              }}
            >
              Choose category
            </Label>
          )}
        </LabelContainer>
        {isOpenSelector && (
          <Dropdown>
            <ul>
              {data.category.descendants.map(cat => (
                <li
                  key={cat._id}
                  onClick={() => {
                    setIdCurCat(cat._id);
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
