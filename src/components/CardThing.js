import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../client/query';
import { ThingImage, Star, StarActive } from './elements';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 2px solid black;
  border-radius: 0.5em;
  box-shadow: 2px 2px 3px gray;
  background: linear-gradient(
    31deg,
    hsl(211deg 55% 82%) -48%,
    hsl(198deg 44% 93%) 63%,
    hsl(46deg 50% 50%) 200%
  );
  overflow: hidden;
`;
const ImageContainer = styled.div`
  flex: 1 1 50%;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  overflow: hidden;
  box-shadow: 0 -2px 7px black;
`;

const List = styled.ul`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;
  padding: 0.5em;
  border-radius: 0.5em;
  border-color: rgba(0, 0, 0, 0.2);

  li + li {
    margin-top: 0.5em;
  }
`;

const Description = styled.li`
  border: 2px dashed black;
  border-radius: 0.5em;
  padding: 0.5em;
  flex: 3;
`;

const Rating = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
`;

const Info = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
`;
const ButtonMore = styled.li`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: 0 0 1px black;
  margin: 0 -0.5em -0.5em -0.5em;

  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1em;
    color: #fff;
    text-shadow: 0 0 2px hsl(240deg 66% 28%);
    background: hsl(221deg 29% 79%);
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    &:hover {
      color: hsl(240deg 66% 28%);
      background: hsl(35deg 40% 95%);
    }
    &:active {
      color: hsl(240deg 66% 28%);
      background: hsl(35deg 40% 85%);
    }
  }
`;

const CardThing = props => {
  const { thing } = props;
  const { data: categoryData, loading } = useQuery(GET_CATEGORY, {
    variables: { id: thing.category[thing.category.length - 1] }
  });
  const description =
    thing.description.length > 47
      ? thing.description.slice(0, 47) + '...'
      : thing.description;
  const nStarActive = Number(thing.rating);
  const nStar = 10 - nStarActive;
  return (
    <Card key={thing._id}>
      <ImageContainer>
        <ThingImage
          categoryName={loading ? 'loading...' : categoryData?.category.title}
          image={thing.image}
        />
      </ImageContainer>
      <List>
        <li>
          <h2>{thing.title || 'title none'}</h2>
        </li>
        <Rating>
          {new Array(nStarActive).fill(null).map((item, i) => (
            <StarActive key={i} />
          ))}
          {nStar > 0 &&
            new Array(nStar).fill(null).map((item, i) => <Star key={i} />)}
        </Rating>
        <Description>
          <p>{description || 'Descripton empty'}</p>
        </Description>
        <Info>
          <span>By: {thing.author.username || 'unknown author'}</span>
          <span>{dayjs(thing.createdAt).format('DD.MM.YY')}</span>
        </Info>
        <ButtonMore
          onClick={event => props.history.push(`/thing/${thing._id}`)}
        >
          <span>More</span>
        </ButtonMore>
      </List>
    </Card>
  );
};

export default withRouter(CardThing);
