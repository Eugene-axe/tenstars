import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../client/query";

const Link = styled.span`
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    text-decoration: underline;
    color: hsl(220deg 30% 52%);
  }
`;
const Crumbs = (props) => {
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id: props.id },
  });
  let title;
  if (loading) title = "Loading ";
  if (error) title = "Error ";
  title = data?.category.title;
  return (
    <Link
      onClick={() => {
        props.action(props.id);
      }}
    >{`${title}`}</Link>
  );
};

const BreadCrumbsForForm = (props) => {
  const { path, setId } = props;
  const goTo = (id) => {
    setId(id);
  };
  return (
    <div>
      {path.map((cat) => {
        if (cat) {
          return (
            <span key={cat}>
              {` / `}
              <Crumbs id={cat} action={goTo} />
            </span>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default BreadCrumbsForForm;
