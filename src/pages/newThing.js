import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { NEW_THING } from '../client/mutation';
import { GET_THINGS } from '../client/query';
import useAlert from '../hooks/useAlert';

import FormThing from '../components/FormThing';
import { NEGATIVE, POSITIVE } from '../const';
const Wrapper = styled.div``;

const NewThing = props => {
  useEffect(() => {
    document.title = 'Create New - ThingRating';
  });
  const { setAlert } = useAlert();
  const [newThing] = useMutation(NEW_THING, {
    onCompleted: data => {
      setAlert('Thing added', POSITIVE);
      setTimeout(() => {
        props.history.push('/');
      }, 1500);
    },
    onError: error => {
      setAlert('The unthinkable happened', NEGATIVE);
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

  return (
    <Wrapper>
      <FormThing mutation={newThing} />
    </Wrapper>
  );
};

export default NewThing;
