import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SIGNIN_USER } from '../client/mutation';
import LayoutForm from '../components/LayoutForm';
import useAlert from '../hooks/useAlert';
import { NEGATIVE, POSITIVE } from '../const';
import useUserContext from '../hooks/useUserContext';

const SingIn = props => {
  const { logIn } = useUserContext();
  const { setAlert } = useAlert();
  useEffect(() => {
    document.title = 'Sign In - ThingRating';
  }, []);

  const [signIn] = useMutation(SIGNIN_USER, {
    onCompleted: ({ signIn : {token , user} }) => {
      setAlert('Мы вас узнали, богатым не будете 🤩', POSITIVE);
      logIn(token, user);
      setTimeout(() => {
        props.history.push(props.location.state?.from || '/');
      }, 500);
    },
    onError: error => {
      console.log(error);
      setAlert('Не тот логин🙀 пароль🤷', NEGATIVE);
    },
  });
  return (
    <React.Fragment>
      <LayoutForm formType="signin" signAction={signIn} />
    </React.Fragment>
  );
};

export default SingIn;
