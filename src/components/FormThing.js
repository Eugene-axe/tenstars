import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ThingImage, ButtonPositive, ButtonNegative } from './elements';
import CategorySelection from './CategorySelection';
import useAlert from '../hooks/useAlert';
import useValidate from '../hooks/useValidate';
import { invalidError } from './styled/additionalStyles';
import { NEUTRAL, NEGATIVE } from '../const';

const FormThing = props => {
  const imgbantoken = process.env.IMG_BAN_TOKEN;
  const imgbanskey = process.env.IMG_BAN_SKEY;
  const title = useRef();
  const description = useRef();
  const rating = useRef();
  const [values, setValues] = useState({
    title: props.thing?.title || '',
    description: props.thing?.description || '',
    rating: +props.thing?.rating || 0,
    category: props.thing?.category || [''],
    image: props.thing?.image || null
  });
  const { validate, errors, isPermit } = useValidate();
  const { setAlert } = useAlert();
  const [loadImage, setLoadImage] = useState(false);
  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onImage = async event => {
    setLoadImage(true);
    const file = event.target.files[0];

    let fd = new FormData();
    fd.append('image', file);
    fd.append('secret_key', imgbanskey);
    try {
      const response = await fetch('https://api.imageban.ru/v1', {
        headers: {
          Authorization: `TOKEN ${imgbantoken}`
        },
        method: 'POST',
        body: fd
      });
      const data = await response.json();
      if (data.success) {
        setValues({ ...values, image: data.data.link });
      } else {
        throw new Error('File are no appload');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadImage(false);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!values.title) {
      setAlert('Input title field', NEUTRAL);
      title.current.focus();
      return;
    }
    if (!values.description) {
      setAlert('Input description field', NEUTRAL);
      description.current.focus();
      return;
    }
    if (!values.rating) {
      setAlert('Rate the item', NEUTRAL);
      rating.current.focus();
      return;
    }
    if (!isPermit) {
      console.log(errors)
      console.log(values)
      
      setAlert('There are field conflicts', NEGATIVE);
      return;
    }
    props.mutation({
      variables: { ...values }
    });
    props.history.push('/');
  };

  return (
    <Form onSubmit={onSubmit}>
      <ImageContainer>
        <ThingImage image={values.image} />
      </ImageContainer>
      <Fieldset>
        <legend>Create thing card</legend>
        <List>
          <li>
            <label htmlFor="thing-title">Title</label>
            <InputTitle
              error={errors.title}
              ref={title}
              type="text"
              id="thing-title"
              name="title"
              value={values.title}
              onChange={onChange}
              onBlur={event => {
                validate({
                  name: event.target.name,
                  value: event.target.value,
                  conditions: {
                    require: true,
                    minLength: 4,
                    maxLength: 20
                  }
                });
              }}
            />
          </li>
          <li>
            <CategorySelection
              setValues={category => {
                setValues({ ...values, category });
              }}
            />
          </li>
          <li>
            <label htmlFor="thing-description">Descriprion</label>
            <AreaDescription
              name="description"
              id="thing-description"
              rows="4"
              value={values.description}
              ref={description}
              onChange={onChange}
              onBlur={event => {
                validate({
                  name: event.target.name,
                  value: event.target.value,
                  conditions: {
                    require: true,
                    minLength: 4,
                    maxLength: 200
                  }
                });
              }}
              error={errors.description}
            />
          </li>
          <li>
            <label htmlFor="thing-rating"></label>
            <RatingContainer error={errors.rating}>
              <InputRating
                type="range"
                min="1"
                max="10"
                step="1"
                value={values.rating}
                name="rating"
                id="thing-rating"
                ref={rating}
                onChange={event => {
                  setValues({
                    ...values,
                    [event.target.name]: Number(event.target.value)
                  });
                  validate({
                    name: event.target.name,
                    value: Number(event.target.value),
                    conditions: {
                      require: true,
                      min: 1,
                      max: 10
                    }
                  });
                }}
              />
              <span>{values.rating}</span>
            </RatingContainer>
          </li>
          <InputFileContainer>
            <label htmlFor="thing-image">Image</label>
            <input
              type="file"
              name="image"
              id="thing-image"
              onChange={onImage}
            />
          </InputFileContainer>
          <ButtonContainer className="ButtonContainer">
            <ButtonNegative
              type="button"
              onClick={() => {
                props.history.goBack();
              }}
            >
              leave
            </ButtonNegative>
            <ButtonPositive
              type="submit"
              onSubmit={onSubmit}
              disabled={loadImage}
            >
              Send
            </ButtonPositive>
          </ButtonContainer>
        </List>
      </Fieldset>
    </Form>
  );
};

const Form = styled.form`
  width: 25em;
  margin: 1em;
  display: flex;
  flex-direction: column;
  height: 700px;
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
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    border: 1px solid black;
  }
  * {
    transition: all 0.2s ease;
  }
`;
const ImageContainer = styled.div`
  min-height: 150px;
  flex: 1;
  border-top-left-radius: 0.4em;
  border-top-right-radius: 0.4em;
  overflow: hidden;
  box-shadow: 0 -2px 7px black;
`;
const Fieldset = styled.fieldset`
  flex: 1;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  border-color: rgba(0, 0, 0, 0.2);
  legend {
    padding: 0.1em 0.5em;
    font-size: 1.2em;
  }
`;
const List = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  & > li + li {
    margin-top: 0.5em;
  }
  li {
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
  }
  li input {
    background-color: transparent;
  }
`;
const InputTitle = styled.input`
  border: none;
  border-bottom: 1px solid rgba(40, 40, 40, 0.4);
  outline: none;
  padding: 0.5em 1em 0.2em;
  border-top-right-radius: 0.2em;
  border-top-left-radius: 0.2em;
  transition: all 0.2s ease;
  &#thing-title {
    ${({ error }) => error && invalidError}
  }

  &:hover {
    background-color: hsl(35deg 40% 95%);
  }

  &:focus {
    background-color: hsl(35deg 40% 85%);
    border-color: rgba(0, 0, 0, 0.8);
  }
`;
const AreaDescription = styled.textarea`
  width: 100%;
  border: none;
  border: 2px dashed black;
  border-radius: 0.5em;
  outline: none;
  padding: 0.5em 1em 0.2em;
  background-color: transparent;
  resize: none;

  ${({ error }) => error && invalidError}

  &:hover {
    background-color: hsl(35deg 40% 95%);
  }
  &:focus {
    background-color: hsl(35deg 40% 85%);
    border-color: rgba(0, 0, 0, 0.8);
  }
`;
const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  span {
    position: absolute;
    font-size: 1em;
    top: 0.5em;
    right: 1em;
    transform: translateY(-50%);
    color: inherit;
  }
  ${({ error }) => error && invalidError}
`;
const InputRating = styled.input`
  flex: 1;
  appearance: none;
  cursor: pointer;
  position: relative;
  height: 3em;
  border-radius: 0.2em;

  &:hover {
    background: hsl(35deg 40% 95%);
  }
  &:focus {
    background: hsl(35deg 40% 95%);
  }
  &:active {
    background: hsl(35deg 40% 85%);
  }

  &::before {
    content: 'Rating';
    position: absolute;
    font-size: 1em;
    top: 0.5em;
    left: 1em;
    transform: translateY(-50%);
    color: inherit;
  }

  &::-webkit-slider-runnable-track {
    height: 1px;
    width: 100%;
    border-radius: 0.2em;
    background-color: black;
    appearance: none;
    box-shadow: inset 0px 0px 4px hsl(31deg 20% 20%);
    position: absolute;
    bottom: 0;
    transform: rotate(180deg) scale(-1, 1);
  }
  &::-webkit-slider-thumb {
    appearance: none;
    height: 1.5em;
    background: linear-gradient(
      to right,
      hsl(240deg 30% 30%),
      hsl(250deg 30% 50%)
    );
    width: 2px;
    border-radius: 0.2em;
    box-shadow: 2px 0px 4px hsl(240deg 30% 20%);
  }
`;
const InputFileContainer = styled.li`
  input[type='file'] {
    visibility: hidden;
    display: none;
  }
  label {
    display: block;
    width: 100%;
    padding: 0.8em;
    text-align: center;
    font-size: 1em;
    color: inherit;
    background: transparent;
    box-shadow: 0 0 1px black;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  label:hover {
    background: hsl(35deg 40% 95%);
  }
  label:active {
    background: hsl(35deg 40% 85%);
  }
`;
const ButtonContainer = styled.li`
  &.ButtonContainer {
    flex-direction: row;
  }
  button + button {
    margin-left: 0.5em;
  }
`;

export default withRouter(FormThing);
