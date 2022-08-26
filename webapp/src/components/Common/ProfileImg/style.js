import styled from 'styled-components';

export const ProfileImg = styled.img`
  position: absolute; // * : 각 div 상자에 걸쳐있는 프로필 이미지 때문에 absolute로 위치를 설정해 줌.
  display: flex;

  width: 30%;
  height: 25%;

  left: 62%;
  top: 18%;

  border-radius: 50%;
`;
