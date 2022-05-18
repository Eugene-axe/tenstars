import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonPositive, ButtonNegative, InputText} from '../components/elements';

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3em;
  border: 2px solid #222;
  border-radius: 0.2em;
  box-shadow: 0px 0px 3px black;

  @media { max-width: 600px} {
    padding: 1em;
  }
  @media { max-width: 400px} {
    padding: 0.3em;
  }
`;

const List = styled.ul`
  list-style-type: none;
`;
const Li = styled.li`
  display: flex;

  & + & {
    margin-top: 0.4em;
  }
  & > * {
    flex: 1;
  }
`;
const Field = styled.fieldset`
  min-width: 20em;
  max-width: 30em;

  @media { max-width: 600px} {
    max-width: 15em;
  }
  @media { max-width: 400px} {
    width: 100%;
  }
`;

const Input = styled(InputText)`
  background: transparent;
`;
const FormLogin = (props) => {
  const [values, setValues] = useState({});

  const onChange = event => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    props.signAction({ variables: { ...values } });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <legend>{props.formType === 'signin' ? 'Sing in' : 'Sign Up'}</legend>
        <List>
          <Li>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              placeholder="enter username"
              id="username"
              name="username"
              required
              onChange={onChange}
            />
          </Li>
          {props.formType === 'signup' && (
            <Li>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                placeholder="enter rname"
                id="name"
                name="name"
                required
                onChange={onChange}
              />
            </Li>
          )}
          <Li>
            <label htmlFor="username">Password</label>
            <Input
              type="password"
              placeholder="enter password"
              id="password"
              name="password"
              required
              onChange={onChange}
            />
          </Li>
          <Li>
            <ButtonNegative
              type="Button"
              onClick={() => {
                props.history.push('/');
              }}
            >
              Leave
            </ButtonNegative>
            <ButtonPositive type="submit">
              {props.formType === 'signin' ? 'Enter' : 'Register'}
            </ButtonPositive>
          </Li>
        </List>
      </Field>
    </Form>
  );
};

export default withRouter(FormLogin);
