import React, { createContext, useState } from 'react';

const UserContext = createContext({
  user: {},
  logOut: () => {},
  logIn: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function logOut() {
    localStorage.removeItem('token');
    setUser(null);
  }
  function logIn(token, user) {
    localStorage.setItem('token', token);
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logOut,
        logIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
