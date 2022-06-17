import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../client/mutation';
import { SET_IS_LOGGED_IN } from '../client/cache';
import LayoutForm from '../components/LayoutForm';
import useAlert from '../hooks/useAlert';
import useUserContext from '../hooks/useUserContext';
import { POSITIVE } from '../const';

const SignUp = props => {
  const { logIn } = useUserContext();
  useEffect(() => {
    document.title = 'Sign Up - ThingRating';
  }, []);
  const { setAlert } = useAlert();
  const [signUp, { client }] = useMutation(SIGNUP_USER, {
    onCompleted: ({ signUp: { token, user } }) => {
      // localStorage.setItem('token', data.signUp);
      // client.writeQuery({
      //   query: SET_IS_LOGGED_IN,
      //   data: { isLoggedIn: true }
      // });
      logIn(token, user);
      setAlert('Hello newbie', POSITIVE);
      props.history.push('/');
    },
    onError: error => {
      setAlert('Some troubles, sorry...', NEGATIVE);
      options.reset();
    }
  });

  return (
    <React.Fragment>
      <LayoutForm formType="signup" signAction={signUp}></LayoutForm>
    </React.Fragment>
  );
};

export default SignUp;
