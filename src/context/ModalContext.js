import React, { createContext, useState } from 'react';

const ModalContext = createContext({
  content: () => {},
  isHide: true
});

const APPEARANCE_TIME = 100;

export const ModalProvider = ({ children }) => {
  const [content, setContent] = useState(() => <></>);
  const [isHide, setHide] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const openModal = () => {
    setHide(false);
    setTimeout(() => {
      setOpacity(1);
    }, APPEARANCE_TIME);
  };

  const closeModal = () => {
    setOpacity(0);
    setTimeout(() => {
      setHide(true);
    }, APPEARANCE_TIME);
  };
  return (
    <ModalContext.Provider
      value={{
        APPEARANCE_TIME,
        isHide,
        openModal,
        closeModal,
        opacity,
        content,
        setContent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
