import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../client/mutation';
import LayoutForm from '../components/LayoutForm';
import useAlert from '../hooks/useAlert';
import { NEGATIVE, POSITIVE } from '../const';
import { ME } from '../client/query';

const SingIn = props => {
  const { setAlert } = useAlert();
  useEffect(() => {
    document.title = 'Sign In - ThingRating';
  }, []);

  const [signIn] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      setAlert('Мы вас узнали, богатым не будете 🤩', POSITIVE);
      setTimeout(() => {
        props.history.push(props.location.state?.from || '/');
      }, 1500);
    },
    onError: error => {
      setAlert('Не тот логин🙀 пароль🤷', NEGATIVE);
    }, 
    refetchQueries: [{query: ME}]
  });
  return (
    <React.Fragment>
      <LayoutForm formType="signin" signAction={signIn} />
    </React.Fragment>
  );
};

export default SingIn;
