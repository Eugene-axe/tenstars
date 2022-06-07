import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_THING, GET_THINGS } from '../client/query';
import { UPDATE_THING } from '../client/mutation';
import FormThing from '../components/FormThing';
import SceletCard from '../components/loaders/SceletCard';
import useAlert from '../hooks/useAlert';
import { NEGATIVE, POSITIVE } from '../const';

const EditThing = props => {
  const id = props.match.params.id;
  const { setAlert } = useAlert();

  useEffect(() => {
    document.title = 'Edit Вещь - Thing Rating';
  }, []);

  const { data, error, loading } = useQuery(GET_THING, {
    variables: { _id: id }
  });

  const [updateThing] = useMutation(UPDATE_THING, {
    onCompleted: data => {
      setAlert('Thing updated', POSITIVE);
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
    ],
    variables: { id }
  });
  if (loading) {
    return <SceletCard />;
  }
  if (error) {
    return <p>Oops. If you're looking for trouble</p>;
  }

  return <FormThing thing={data.thing} mutation={updateThing} />;
};

export default EditThing;
