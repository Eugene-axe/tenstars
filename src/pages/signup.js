import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../client/mutation';
import LayoutForm from '../components/LayoutForm';

const SignUp = props => {
  useEffect(() => {
    document.title = 'Sign Up - ThingRating';
  }, []);

  const [signUp, { loading, error, client }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <LayoutForm formType="signup" signAction={signUp}></LayoutForm>;
      {loading && <p>Loading...</p>}
      {error && <p>Errorka in query "SignUpUser"</p>}
    </React.Fragment>
  );
};

export default SignUp;
