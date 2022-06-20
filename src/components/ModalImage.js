import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from './styled/additionalStyles';

const walkArray = (array, image, increment = 0) => {
  const index = array.findIndex(item => {
    return item === image;
  });
  console.log({ array, index, increment });
  if (index + +increment >= array.length) return array[0];
  if (index + +increment < 0) return array[array.length - 1];
  return array[index + +increment];
};

const ModalImage = props => {
  const { setHide, arrayImage, currentImage } = props;

  const [image, setImage] = useState(currentImage);

  const closeModal = () => {
    setHide(true);
  };

  const changeImage = increment => {
    setImage(walkArray(arrayImage, image, increment));
  };

  return (
    <Wrapper>
      <ImgContainer>
        <img src={image} />
      </ImgContainer>
      <BtnContainer>
        <Arrow
          onClick={() => {
            changeImage(-1);
          }}
        >
          &#8249;
        </Arrow>
        <ButtonClose
          onClick={() => {
            closeModal();
          }}
        >
          close
        </ButtonClose>
        <Arrow
          onClick={() => {
            changeImage(1);
          }}
        >
          &#8250;
        </Arrow>
      </BtnContainer>
    </Wrapper>
  );
};

export default ModalImage;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  flex: 1 1 90%;
  max-height: 88%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    box-shadow: 0px 0px 15px black;
  }
`;

const BtnContainer = styled.div`
  flex: 1 1 10%;
  padding-top: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 20em;
`;

const ButtonClose = styled.button`
  ${ButtonWrapper}
  background: transparent;
  flex-grow: 0;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: bold;

  :hover {
    box-shadow: 0px 0px 15px black;
    text-shadow: 0px 0px 15px black;
  }
  :active {
    color: #aaa;
    border-color: #aaa;
  }
`;

const Arrow = styled.span`
  width: 1em;
  height: 1em;
  font-size: 2em;
  line-height: 0.7;
  text-align: center;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  :hover {
    box-shadow: 0px 0px 15px black;
    text-shadow: 0px 0px 15px black;
  }
  :active {
    color: #aaa;
    border-color: #aaa;
  }
`;
