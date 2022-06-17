import React, { createContext, useState } from 'react';

const UserContext = createContext({
  // isLoggedIn: false,
  user: {},
  logOut: () => {},
  logIn: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [isLoggedIn, setLoggedIn] = useState({});

  function logOut() {
    localStorage.removeItem('token');
    setUser(null);
    // setLoggedIn(false);
  }
  function logIn(token, user) {
    localStorage.setItem('token', token);
    setUser(user);
    // setLoggedIn(true);
  }

  return (
    <UserContext.Provider
      value={{
        // isLoggedIn,
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
