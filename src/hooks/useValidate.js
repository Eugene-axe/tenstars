import { useState } from 'react';
import useAlert from './useAlert';
import { NEGATIVE } from '../const';

export default function() {
  const [errors, setErrors] = useState({});
  const { setAlert } = useAlert();
  const alertNegative = message => setAlert(message, NEGATIVE);

  function isPermit() {
    let permit = true;
    for (let item in errors) {
      if (errors[item]) permit = false;
    }
    return permit;
  }

  function validate({ conditions = {}, value, name }) {
    if (conditions.require) {
      if (!value) {
        setErrors({ ...errors, [name]: true });
        alertNegative('Require value');
        return;
      }
    }
    if (value && conditions.minLength) {
      if (value.length < conditions.minLength) {
        alertNegative(`min-length value ${conditions.minLength} char`);
        setErrors({ ...errors, [name]: true });
        return;
      }
    }

    if (value && conditions.maxLength) {
      if (value.length >= conditions.maxLength) {
        alertNegative(`max-length value ${conditions.maxLength} char`);
        setErrors({ ...errors, [name]: true });
        return;
      }
    }

    if (value && conditions.max) {
      if (+value > conditions.max) {
        alertNegative(`max value ${conditions.max}`);
        setErrors({ [name]: true });
        return;
      }
    }

    if (value && conditions.min) {
      if (+value < conditions.min) {
        alertNegative(`min value ${conditions.min}`);
        setErrors({ [name]: true });
        return;
      }
    }
    setErrors({ ...errors, [name]: false });
  }

  return { validate, errors, isPermit: isPermit() };
}
