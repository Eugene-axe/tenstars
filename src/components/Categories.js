import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';

import CategoriesFeed from './CategoriesFeed';
import ButtonSecondary from './elements/ButtonSecondary';
import LoadCategoryFeed from './loaders/loadCategoryFeed';

const Wrapper = styled.div`
  overflow-x: hidden;
  & > * {
    width: 100%;
  }
`;

const ButtonToggle = styled(ButtonSecondary)`
  display: none;
  @media (max-width: 450px) {
    display: block;
  }
`;

const Categories = () => {
  const basisCatId = process.env.CAT_ID;
  const [isHide, setHide] = useState(true);
  const [id, setId] = useState(basisCatId);
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: id }
  });
  if (error) return <p>Errorka</p>;
  return (
    <Wrapper>
      <ButtonToggle
        onClick={() => {
          setHide(!isHide);
        }}
      >
        Categories &#9776;
      </ButtonToggle>
      {!loading ? (
        <CategoriesFeed
          isHide={isHide}
          category={data.category}
          setId={setId}
          isRoot={id === basisCatId}
        />
      ) : (
        <LoadCategoryFeed isHide={isHide} />
      )}
    </Wrapper>
  );
};

export default Categories;
