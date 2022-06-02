import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
  ButtonPositive,
  ButtonNegative,
  InputText
} from '../components/elements';
import useValidate from '../hooks/useValidate';
import useAlert from '../hooks/useAlert';
import { NEGATIVE } from '../const';
import { invalidError } from './styled/additionalStyles';

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3em;
  border: 2px solid #222;
  border-radius: 0.2em;
  box-shadow: 0px 0px 3px black;

  @media (max-width: 600px) {
    padding: 1em;
  }
  @media (max-width: 400px) {
    padding: 0.3em;
  }
  @media (max-width: 300px) {
    padding: 0em;
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

  @media (max-width: 600px) {
    min-width: 15em;
    max-width: 25em;
  }
  @media (max-width: 400px) {
    font-size: 0.9em;
  }
  @media (max-width: 300px) {
    font-size: 0.85em;
  }
`;

const Input = styled(InputText)`
  background: transparent;
  ${({ error }) => error && invalidError}
`;

const FormLogin = props => {
  const [values, setValues] = useState({});
  const { validate, errors, isPermit } = useValidate();
  const { setAlert } = useAlert();
  const onChange = event => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('[name]');
    for (let item of inputs) {
      if (!item.value) {
        item.focus();
        return;
      }
    }
    if (!isPermit) {
      setAlert( 'There are field conflicts' , NEGATIVE)
      return;
    }
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
              error={errors.username}
              type="text"
              placeholder="enter username"
              id="username"
              name="username"
              onChange={onChange}
              onBlur={event => {
                validate({
                  name: event.target.name,
                  value: event.target.value,
                  conditions: {
                    require: true,
                    minLength: 4,
                    maxLength: 20
                  }
                });
              }}
            />
          </Li>
          {props.formType === 'signup' && (
            <Li>
              <label htmlFor="name">Name</label>
              <Input
                error={errors.name}
                type="text"
                placeholder="enter rname"
                id="name"
                name="name"
                onChange={onChange}
                onBlur={event => {
                  validate({
                    name: event.target.name,
                    value: event.target.value,
                    conditions: {
                      require: true,
                      minLength: 4,
                      maxLength: 20
                    }
                  });
                }}
              />
            </Li>
          )}
          <Li>
            <label htmlFor="username">Password</label>
            <Input
              error={errors.password}
              type="password"
              placeholder="enter password"
              id="password"
              name="password"
              onChange={onChange}
              onBlur={event => {
                validate({
                  name: event.target.name,
                  value: event.target.value,
                  conditions: {
                    require: true,
                    minLength: 4
                  }
                });
              }}
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
