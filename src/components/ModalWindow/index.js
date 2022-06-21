import React from 'react';
import LayoutModal from './LayoutModal';
import useModal from '../../hooks/useModal';

const ModalWindow = props => {
  const { isHide, opacity, APPEARANCE_TIME, content } = useModal();

  if (isHide) return <></>;
  return (
    <LayoutModal opacity={opacity} time={APPEARANCE_TIME}>
      {content}
    </LayoutModal>
  );
};

export default ModalWindow;
