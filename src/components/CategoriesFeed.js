import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ButtonPositive, ButtonDanger } from './elements';
import ButtonSecondary from './elements/ButtonSecondary';

const Ul = styled.ul`
  list-style-type: none;
  @media (max-width: 400px) {
    display: ${props => (props.isHide ? 'none' : 'block')};
  }
`;

const Node = styled.li`
  display: flex;
  font-weight: bold;
  cursor: pointer;
`;
const Vertex = styled.li`
  display: flex;
`;

const CategoriesFeed = props => {
  const { category, setId, isRoot } = props;
  const linkBack =
    category.directAncestor === process.env.CAT_ID
      ? '/'
      : `/category/${category.directAncestor}`;
  const onBack = event => {
    setId(category.directAncestor);
  };

  const goToLink = path => {
    props.history.push(path);
  };

  return (
    <Ul isHide={props.isHide}>
      {!isRoot && (
        <Node
          onClick={onBack}
          style={{
            boxShadow: 'hsl(0deg 60% 28%) 0px 5px 11px',
            marginBottom: '3px'
          }}
        >
          <ButtonDanger onClick={() => goToLink(linkBack)}>Back</ButtonDanger>
        </Node>
      )}
      {category.descendants.map(cat => {
        const isAncestor = !!cat.descendants.length;
        return isAncestor ? (
          <Node
            key={cat._id}
            onClick={() => {
              setId(cat._id);
            }}
          >
            <ButtonPositive onClick={() => goToLink(`/category/${cat._id}`)}>
              {cat.title}
            </ButtonPositive>
          </Node>
        ) : (
          <Vertex key={cat._id}>
            <ButtonSecondary onClick={() => goToLink(`/category/${cat._id}`)}>
              {cat.title}
            </ButtonSecondary>
          </Vertex>
        );
      })}
    </Ul>
  );
};

export default withRouter(CategoriesFeed);
