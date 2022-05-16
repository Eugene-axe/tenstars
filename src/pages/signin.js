import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { SIGNIN_USER } from '../client/mutation';
import LayoutForm from '../components/LayoutForm';

const SingIn = props => {
  const client = useApolloClient();
  useEffect(() => {
    document.title = 'Sign In - ThingRating';
  }, []);

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push(props.location.state?.from || '/');
    }
  });
  return (
    <React.Fragment>
      <LayoutForm formType="signin" signAction={signIn} />
      {loading && <p>Loading...</p>}
      {error && <p>Errorka in query "SignInUser"</p>}
    </React.Fragment>
  );
};

export default SingIn;
