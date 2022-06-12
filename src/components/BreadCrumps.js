import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';

export const Wrapper = styled.ul`
  text-align: center;
  list-style-type: none;
  display: flex;
  margin: 1em;
`;
export const Item = styled.li`
  cursor: pointer;
  transform: skewX(-5deg);
  background-color: hsl(170deg 7% 82%);
  box-shadow: -2px 0px 10px -6px rgba(0, 0, 0, 0.5);
  z-index: 1;
  margin-left: -20px;
  transition: all 0.5s;
  display: flex;
  align-items: center;

  &:first-child {
    margin-left: 0px;
    background-color: hsl(218deg 20% 60%);
    &:hover {
      background-color: hsl(218deg 23% 50%);
    }
  }
  &:last-child {
    background-color: hsl(46deg 20% 70%);
    &:hover {
      background-color: hsl(46deg 23% 50%);
    }
  }
  &:hover {
    background-color: hsl(170deg 9% 72%);
  }
  &:hover + li {
    margin-left: 0px;
  }
  a {
    display: block;
    padding: 5px 10px;
    transform: skewX(15deg);
    text-decoration: none;
    color: #444;
    font-weight: 300;
    &:link,
    &:visited {
      color: inherit;
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
  title = data?.category.title || 'categories';
  return <Link to={`/category/${props.id}`}>{`${title}`}</Link>;
};

const BreadCrumbs = props => {
  return (
    <Wrapper>
      {props.catList.map(cat => {
        return cat ? (
          <Item key={cat}>
            <Crumbs id={cat} />
          </Item>
        ) : (
          ''
        );
      })}
    </Wrapper>
  );
};

export default BreadCrumbs;
