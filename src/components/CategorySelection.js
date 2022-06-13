import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';
import { NEW_CATEGORY } from '../client/mutation';
import BreadCrumbsForForm from './BreadCrumpsForForm';
import InputDatalist from './InputDatalist';

const CategorySelection = props => {
  const lastIdCategories = props.categories[props.categories.length - 1];

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

  if (error)
    return <p>Error at same downloadind information about category! </p>;

  return (
    <Wrapper>
      <Path>
        <BreadCrumbsForForm
          path={loading ? [''] : props.categories}
          trimmCats={id => {
            const trimmedCats = arrayTrimmedByValue(id, props.categories);
            props.setCategories(trimmedCats);
          }}
        />
      </Path>
      <InputDatalist
        loading={loading}
        list={loading ? [] : data.category.descendants}
        labelText={'Choose category'}
        inputPlaceholder={'Enter category name'}
        actionWithReturnValue={cat => {
          props.setCategories([...props.categories, cat._id]);
        }}
        actionWithNewValue={titleCat => {
          newCategory({
            variables: { directAncestor: lastIdCategories, title: titleCat }
          });
        }}
        actionIcon={'+'}
        maxRows={4}
        validateConditions={{
          require: true,
          minLength: 3,
          maxLength: 20
        }}
      />
    </Wrapper>
  );
};

export default CategorySelection;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 2;
  * {
    transition: all 0.2s ease;
  }
`;
const Path = styled.div`
  flex: 1;
`;

const arrayTrimmedByValue = (value, array) => {
  const index = array.indexOf(value);
  trimArray = array.slice(0, index + 1);
  return trimArray;
};
