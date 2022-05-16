import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_THING } from '../client/query';
import { UPDATE_THING } from '../client/mutation';
import FormThing from '../components/FormThing';

const EditThing = props => {
  const id = props.match.params.id;

  useEffect(() => {
    document.title = 'Edit Вещь - Thing Rating';
  }, []);

  const { data, error, loading } = useQuery(GET_THING, {
    variables: { _id: id }
  });

  const [updateThing] = useMutation(UPDATE_THING, {
    onCompleted: (data) => {
      console.log('updated');
      console.log('updated', data.updateThing);
    },
    variables: { id }
  });
  if (loading) {
    return <p>Loading information abouth this Thing. Please await</p>;
  }
  if (error) {
    return <p>Oops. If you're looking for trouble</p>;
  }

  return <FormThing thing={data.thing} mutation={updateThing} />;
};

export default EditThing;
