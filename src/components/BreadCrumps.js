import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';

const Crumbs = props => {
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: props.id }
  });
  let title;
  if (loading) title = 'Loading ';
  if (error) title = 'Error ';
  title = data?.category.title || "categories";
  return <Link to={`/category/${props.id}`}>{`${title}`}</Link>;
};

const BreadCrumbs = props => {
  return (
    <div>
      {props.catList.map(cat => (
        <span key={cat}>{` / `}
          <Crumbs id={cat} />
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
