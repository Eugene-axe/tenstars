import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';

import CategoriesFeed from './CategoriesFeed';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const Categories = () => {
  const basisCatId = process.env.CAT_ID;
  const [id, setId] = useState(basisCatId);
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errorka</p>;
  return (
    <Wrapper>
      <CategoriesFeed
        category={data.category}
        setId={setId}
        isRoot={id === basisCatId}
      />
    </Wrapper>
  );
};

export default Categories;
