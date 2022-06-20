import React from 'react';
import LayoutModal from './LayoutModal';
import useModal from '../../hooks/useModal';

const ModalWindow = props => {
  const { isHide, content } = useModal();
  if (isHide) return <></>;
  return <LayoutModal>{content}</LayoutModal>;
};

export default ModalWindow;
