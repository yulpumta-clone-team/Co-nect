import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: tomato;
  position: fixed;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  opacity: ${(props) => (props.show ? '1' : '0')};
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

function UpperButton() {
  const [show, setShow] = useState(false);
  const handleScroll = () => {
    // const scrollY = window.scrollY;
    const { scrollY } = window;
    if (scrollY > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const moveToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Container show={show} onClick={() => moveToTop()}>
      ⬆️
    </Container>
  );
}

export default UpperButton;
