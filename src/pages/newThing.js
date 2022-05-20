import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { NEW_THING } from '../client/mutation';
import { GET_THINGS } from '../client/query';

import FormThing from '../components/FormThing';
const Wrapper = styled.div``;

const NewThing = props => {
  useEffect(() => {
    document.title = 'Create New - ThingRating';
  });
  const [newThing] = useMutation(NEW_THING, {
    onCompleted: data => {
      props.history.push('/');
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
