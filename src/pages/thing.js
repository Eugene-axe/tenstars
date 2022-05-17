import React, { useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@apollo/client';
import { GET_THING, GET_THINGS } from '../client/query';
import { DELETE_THING } from '../client/mutation';
import {
  ButtonNegative,
  ButtonDanger,
  Star,
  StarActive,
  ButtonPositive
} from '../components/elements';
import BreadCrumbs from '../components/BreadCrumps';
import defaultImg from '../img/picture.svg';

const Wrapper = styled.div`
  display: grid;
  background: linear-gradient(
    30deg,
    hsl(222deg 42% 89%),
    hsl(235deg 38% 95%),
    hsl(240deg 38% 85%) 75%
  );
  padding: 1em;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  grid-template-rows: 1fr 1fr 1fr 4fr 1fr 2em;
  column-gap: 1em;
  row-gap: 0.5em;
  grid-template-areas:
    ' path         preview '
    ' title        preview '
    ' rating       image   '
    ' description  image   '
    ' description  image   '
    ' footer       image   '
    'buttons       .       ';

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 6fr 2fr 1fr 3fr 1em 1fr;
    grid-template-areas:
      ' path        '
      ' title       '
      ' image       '
      ' preview     '
      ' rating      '
      ' description '
      ' footer      '
      ' buttons     ';
  }
`;

const PathContainer = styled.div`
  grid-area: path;
  align-self: center;
  padding: 0.5em;
  border: 2px dashed black;
  border-radius: 0.5em;
  font-size: 1.1rem;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: underline;
  }
`;
const Title = styled.h2`
  grid-area: title;
  align-self: center;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    border-top: 2px solid black;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
  }
`;
const RatingContainer = styled.div`
  grid-area: rating;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .rating-num {
    font-size: 1.2em;
  }
  .r-num {
    font-size: 1.4em;
  }

  @media(max-width: 460px) {
    font-size: 0.8em;
  }
`;

const RatingStars = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 2em;
`;
const Description = styled.div`
  grid-area: description;
  border: 2px dashed black;
  border-radius: 0.5em;
  padding: 0.5em;
  min-height: 5em;
`;
const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: space-between;
`;
const Figure = styled.figure`
  grid-area: image;
  background: center / cover no-repeat url('${props =>
    props.image || defaultImg} ');
  border: 1px solid hsl(205deg 90% 80%);
  border-radius: 0.2em;
`;
const PreviewImage = styled.div`
  grid-area: preview;
  display: flex;

  .pic1 {
    background: center / contain no-repeat url('${props =>
      props.image || defaultImg}');
  }
  .pic2 {
    background: center / contain no-repeat url('${props =>
      props.image || defaultImg}');
  }
  .pic3 {
    background: center / contain no-repeat url('${props =>
      props.image || defaultImg}');
  }
  & > div + div {
    margin-left: 0.5em;
  }
  & > div {
    flex: 1;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s ease;
    border: 1px solid hsl(205deg 90% 80%);
    border-radius: 0.2em;
  }
  & > div:hover {
    background-color: #678;
    background-blend-mode: soft-light;
  }
`;
const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
  flex-direction: row;

  & > button {
    flex: 1;
  }
`;

const ThingPage = props => {
  const id = props.match.params.id;

  useEffect(() => {
    document.title = 'Вещь - Thing Rating';
  }, []);

  const [deleteThing] = useMutation(DELETE_THING, {
    onCompleted: data => {
      console.log(data);
      if (data.deleteThing) {
        props.history.push('/');
      } else {
        console.log('Что то пошло не так при удалении');
      }
    },
    refetchQueries: [{ query: GET_THINGS }]
  });

  const { data, error, loading } = useQuery(GET_THING, {
    variables: { _id: id }
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error find thing</p>;
  const thing = data.thing;

  const nActiveStar = Number(thing.rating);
  const nStar = 10 - thing.rating;
  const date = dayjs(thing.createdAt).format('DD.MM.YYYY [at] HH:mm:ss');

  return (
    <Wrapper>
      <PathContainer>
        <BreadCrumbs catList={thing.category} />
        {/* <a href="#">категория</a> /<a href="#">подкатегория</a> */}
      </PathContainer>
      <Title>{thing.title}</Title>
      <RatingContainer>
        <RatingStars>
          {new Array(nActiveStar).fill(null).map((item, i) => (
            <StarActive key={i} />
          ))}
          {nStar > 0 &&
            new Array(nStar).fill(null).map((item, i) => <Star key={i} />)}
        </RatingStars>
        <p className="rating-num">
          <span className="r-num">{thing.rating}</span> / 10
        </p>
      </RatingContainer>
      <Description>{thing.description}</Description>
      <Footer>
        <span>By: {thing.author.username}</span>
        <span>{date}</span>
      </Footer>
      <Figure image={thing.image}></Figure>
      <PreviewImage>
        <div className="pic1"></div>
        <div className="pic2"></div>
        <div className="pic3"></div>
      </PreviewImage>
      <Buttons>
        <ButtonNegative
          onClick={() => {
            props.history.push('/');
          }}
        >
          Leave
        </ButtonNegative>
        <ButtonDanger
          onClick={event => {
            deleteThing({ variables: { id: id } });
          }}
        >
          Delete
        </ButtonDanger>
        <ButtonPositive
          onClick={() => {
            props.history.push(`/edit/${id}`);
          }}
        >
          Edit
        </ButtonPositive>
      </Buttons>
    </Wrapper>
  );
};

export default ThingPage;
