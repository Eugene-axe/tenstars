import React, { createContext, useState } from 'react';

const ModalContext = createContext({
  content: () => {},
  isHide: true
});

export const ModalProvider = ({ children }) => {
  const [content, setContent] = useState(() => <></>);
  const [isHide, setHide] = useState(true);

  return (
    <ModalContext.Provider
      value={{
        isHide,
        setHide,
        content,
        setContent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
