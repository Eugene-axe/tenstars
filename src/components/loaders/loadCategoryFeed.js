import React from 'react';
import styled from 'styled-components';
import { ButtonLoad } from '../elements';

const Ul = styled.ul`
  list-style-type: none;
  @media (max-width: 450px) {
    display: ${props => (props.isHide ? 'none' : 'block')};
  }
`;

const Vertex = styled.li`
  display: flex;
`;

const loaderCategoriesFeed = props => {
  const { isHide } = props;
  const category = new Array(3).fill(null);

  return (
    <Ul isHide={isHide}>
      {category.map((cat, i) => {
        return (
          <Vertex key={i}>
            <ButtonLoad>Loading...</ButtonLoad>
          </Vertex>
        );
      })}
    </Ul>
  );
};

export default loaderCategoriesFeed;
