import React from 'react';
import Modal from 'components/Common/WindowModal';
import useModal from 'hooks/useModal';
import styled from 'styled-components';

DemoAlert.propTypes = {};

export default function DemoAlert(props) {
  const [isModalOpen, closeModal] = useModal(true);
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <Container>
        <h1> 데모 버전입니다!</h1>
        <p> 실제 API가 아닌 MSW를 활용한 mock api를 활용했습니다. </p>
        <p> 간단한 API 동작 및 UI를 확인할 수 있는 버전입니다. 😀</p>
        <p> API에러는 랜덤으로 발생하게 되어 있어 있습니다. </p>
        <p> 번거로우시겠지만 동작 중 API 에러가 발생하더라도 다시 실행해주시면 감사하겠습니다. </p>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 640px;
  height: 480px;
  z-index: 999;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  border-radius: 20px;
  ${({ theme: { mixin } }) => mixin.flexCenter({})};
  gap: 3rem;
  h1 {
    ${({ theme: { fonts } }) => fonts.korean.title}
  }
  h3 {
    ${({ theme: { fonts } }) => fonts.korean.emphasis}
  }
`;
