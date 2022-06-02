import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNIN_USER } from '../client/mutation';
import { ME } from '../client/query';
import { SET_IS_LOGGED_IN } from '../client/cache';
import LayoutForm from '../components/LayoutForm';
import useAlert from '../hooks/useAlert';
import { NEGATIVE, POSITIVE } from '../const';

const SingIn = props => {
  const client = useApolloClient();
  const { setAlert } = useAlert();
  useEffect(() => {
    document.title = 'Sign In - ThingRating';
  }, []);

  const [signIn, options] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      setAlert('Мы вас узнали, богатым не будете 🤩', POSITIVE);
      client.writeQuery({
        query: SET_IS_LOGGED_IN,
        data: { isLoggedIn: true }
      });
      setTimeout(() => {
        props.history.push(props.location.state?.from || '/');
      }, 1500);
    },
    refetchQueries: [{query : ME}],
    onError: error => {
      setAlert('Не тот логин🙀 пароль🤷', NEGATIVE);
      options.reset();
    }
  });
  return (
    <React.Fragment>
      <LayoutForm formType="signin" signAction={signIn} />
    </React.Fragment>
  );
};

export default SingIn;
