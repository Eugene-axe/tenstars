import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    setCoordImg('top: 0% ; left: 0% ');
  }, [image]);

  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [coordImg, setCoordImg] = useState('top : -150%');

  const closeModal = () => {
    setHide(true);
  };

  const changeImage = increment => {
    setCoordImg(`left : ${-increment * 300}%`);
    setTimeout(() => {
      setCoordImg('top : -200%');
    }, 300);
    setTimeout(() => {
      setImage(walkArray(arrayImage, image, increment));
    }, 350);
  };

  const touchStart = event => {
    const startX = Math.round(event.changedTouches[0].clientX);
    setStartX(startX);
    const startY = Math.round(event.changedTouches[0].clientY);
    setStartY(startY);
  };

  const touchEnd = event => {
    const endX = Math.round(event.changedTouches[0].clientX);
    const endY = Math.round(event.changedTouches[0].clientY);
    if (startX - endX > 100) changeImage(1);
    if (startX - endX < -100) changeImage(-1);
    const diffY = startY - endY;
    if (diffY > 150 || diffY < -150) {
      const direction = diffY > 0 ? -1 : 1;
      setCoordImg(`top : ${200 * direction}% `);
      setTimeout(() => {
        closeModal();
      }, 300);
    }
  };

  const dragStart = event => {
    event.preventDefault();
  };
  return (
    <Wrapper>
      <ImgContainer
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        coord={coordImg}
      >
        <img src={image} draggable={true} onDragStart={dragStart} />
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
    position: relative;
    transition: all 0.3s ease-in-out;
    ${({ coord }) => coord};
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
  @media (max-width: 500px) {
    display: none;
  }
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
