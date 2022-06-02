import React, { createContext, useState } from 'react';

const ALERT_TIME = 3000;
const initialState = {
  text: '',
  type: ''
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {}
});

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('');

  const setAlert = (message, theme) => {
    setMessage(message);
    setTheme(theme);

    setTimeout(() => {
      setMessage('');
      setTheme('');
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        message,
        theme,
        setAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
