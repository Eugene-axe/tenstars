import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@apollo/client';
import { GET_THING, GET_THINGS } from '../client/query';
import { DELETE_THING } from '../client/mutation';
import {
  ButtonNegative,
  Star,
  StarActive,
  ButtonPositive
} from '../components/elements';
import BreadCrumbs from '../components/BreadCrumps';
import defaultImg from '../img/picture.svg';
import ThingLoader from '../components/loaders/thingLoader';
import ButtonImportantAction from '../components/elements/ButtonImportantAction';
import useAlert from '../hooks/useAlert';
import { NEGATIVE, POSITIVE } from '../const';

const getArrayNoLess3 = arr => {
  const addArray = [];
  addArray.length = 3;
  addArray.fill(undefined);
  const wideArray = arr.concat(addArray);
  return wideArray.slice(0, 3);
};

const ThingPage = props => {
  const id = props.match.params.id;

  useEffect(() => {
    document.title = 'Вещь - Thing Rating';
  }, []);
  const [imgMain, setImgMain] = useState('');
  const { setAlert } = useAlert();
  const [deleteThing] = useMutation(DELETE_THING, {
    onCompleted: data => {
      setAlert('Thing deleted', POSITIVE);
      props.history.push('/');
    },
    onError: error => {
      setAlert(error.message, NEGATIVE);
    },
    refetchQueries: [
      {
        query: GET_THINGS,
        variables: {
          category: ''
        }
      }
    ]
  });

  const { data, error, loading } = useQuery(GET_THING, {
    variables: { _id: id },
    onCompleted: ({ thing }) => {
      setImgMain(thing.images[0]);
    }
  });

  if (loading) return <ThingLoader />;
  if (error) return <p>Error find thing</p>;
  const thing = data.thing;

  const nActiveStar = Number(thing.rating);
  const nStar = 10 - thing.rating;
  const date = dayjs(thing.createdAt).format('DD.MM.YYYY [at] HH:mm:ss');

  return (
    <Wrapper>
      <PathContainer>
        <BreadCrumbs catList={thing.category} />
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
      <Figure image={imgMain}></Figure>
      <PreviewImage>
        {getArrayNoLess3(thing.images).map((src, i) => (
          <Minipic
            key={i}
            bgImage={src}
            onClick={() => {
              setImgMain(src);
            }}
          />
        ))}
      </PreviewImage>
      <Buttons>
        <ButtonNegative
          onClick={() => {
            props.history.push('/');
          }}
        >
          Leave
        </ButtonNegative>
        <ButtonImportantAction
          action={() => deleteThing({ variables: { id: id } })}
        >
          Delete
        </ButtonImportantAction>
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

const Wrapper = styled.div`
  min-height: 100%;
  display: grid;
  background: linear-gradient(
    30deg,
    hsl(222deg 42% 89%),
    hsl(235deg 38% 95%),
    hsl(240deg 38% 85%) 75%
  );
  background: linear-gradient(
    31deg,
    hsl(211deg 55% 82%) -48%,
    hsl(198deg 44% 93%) 63%,
    hsl(46deg 50% 50%) 200%
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
  border: 2px dashed black;
  border-radius: 0.5em;
  font-size: 1.1rem;
  a {
    color: inherit;
    text-decoration: none;
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

  @media (max-width: 460px) {
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
  overflow: hidden;
`;
const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: space-between;
`;
const Figure = styled.figure`
  grid-area: image;
  min-height: 150px;
  background: center / cover no-repeat url('${props =>
    props.image || defaultImg} ');
  border: 1px solid hsl(205deg 90% 80%);
  border-radius: 0.2em;
`;
const PreviewImage = styled.div`
  grid-area: preview;
  display: flex;

  & > div + div {
    margin-left: 0.5em;
  }
`;

const Minipic = styled.div`
  background: center / cover no-repeat url('${props =>
    props.bgImage || defaultImg}');
  flex: 1;
  height: 100%;
  cursor: pointer;
  transition: background 0.3s ease;
  border: 1px solid hsl(205deg 90% 80%);
  border-radius: 0.2em;
  :hover {
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
