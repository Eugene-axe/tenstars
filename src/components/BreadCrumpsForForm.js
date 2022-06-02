import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';
import { Wrapper, Item } from './BreadCrumps';

const Wrapper2 = styled(Wrapper)``;
const Item2 = styled(Item)`
  ${'' /* margin: 0.35em 0; */}
  span {
    display: inline-block;
    padding: 0.4em 0.7em;
    font-size: 0.9em;
    @media (max-width: 400px) {
      font-size: 0.7em;
    }
  }
`;

const Crumbs = props => {
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: props.id }
  });
  let title;
  if (loading) title = 'Loading ';
  if (error) title = 'Error ';
  title = data?.category.title;
  return (
    <span
      onClick={() => {
        props.goTo(props.id);
      }}
    >{`${title}`}</span>
  );
};

const BreadCrumbsForForm = props => {
  const { path, setId } = props;
  const goTo = id => {
    setId(id);
  };
  return (
    <Wrapper2>
      {path.map(cat => {
        if (cat) {
          return (
            <Item2 key={cat}>
              <Crumbs id={cat} goTo={goTo} />
            </Item2>
          );
        } else {
          return '';
        }
      })}
    </Wrapper2>
  );
};

export default BreadCrumbsForForm;
