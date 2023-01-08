import styled from 'styled-components/macro';

// * : Card Container
export const CardWrapper = styled.li`
  position: relative;
  width: 350px;
  height: 400px;
  justify-content: center;
  background: ${({ theme: { colors } }) => colors.greyScale.white};

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

// * : 카드 상단 파란색 부분
export const CardTop = styled.div`
  position: relative;
  display: flex;

  height: 30px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
  border-radius: 10px 10px 0px 0px;
`;

export const ProfileImg = styled.div`
  position: absolute; // * : 각 div 상자에 걸쳐있는 프로필 이미지 때문에 absolute로 위치를 설정해 줌.
  display: flex;

  width: 100px;
  height: 100px;
  right: 12px;
  top: 60px;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
  z-index: 5;
  ${({ theme: { animation } }) => animation.skeletonAnimation};
`;

export const BackgroundImg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 96px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 1.2rem;
  ${({ theme: { animation } }) => animation.skeletonAnimation};
`;

export const TeamStatus = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 78px;
  height: 28px;
  border-radius: 50px;

  color: ${({ theme: { colors } }) => colors.greyScale.white};
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 153px;
  padding: 1rem;
  > div:last-child {
    width: 100%;
  }
`;

export const SingleInfo = styled.div`
  height: 22px;
  width: ${({ width = 50 }) => width}%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  margin-bottom: 8px;
  ${({ theme: { animation } }) => animation.skeletonAnimation};
`;

// * : 구분선
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
`;

export const SkillContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const SkillSlide = styled.div`
  padding: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export const SkillImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  ${({ theme: { animation } }) => animation.skeletonAnimation};
`;

export const LeftAngle = styled.button`
  width: 8%;
  height: 60%;
  > svg {
    width: 100%;
    height: 100%;
    & path {
      fill: ${({ theme: { colors } }) => colors.greyScale.black};
      stroke: ${({ theme: { colors } }) => colors.greyScale.black};
    }
  }
`;

export const RightAngle = styled.button`
  width: 8%;
  height: 60%;
  > svg {
    width: 100%;
    height: 100%;
    & path {
      fill: ${({ theme: { colors } }) => colors.greyScale.black};
      stroke: ${({ theme: { colors } }) => colors.greyScale.black};
    }
  }
`;

export const CardInfoIndicator = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem 1rem 0 0;
  gap: 12px;
`;

export const SingleIndicator = styled.div`
  ${({ theme: { mixin } }) => mixin.flexCenter({ direction: 'row' })};
  gap: 4px;
  > div {
    ${({ theme: { animation } }) => animation.skeletonAnimation};
  }
  > div:first-child {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  }
  > div:last-child {
    width: 33px;
    height: 16px;
    background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  }
`;

// Icon
export const Heart = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  left: 14px;
  top: 6px;
  width: 20px;
  height: 20px;
  > svg {
    & path {
      stroke: ${({ theme: { colors } }) => colors.greyScale.white};
      fill: ${({ theme: { colors } }) => colors.greyScale.white};
    }
  }
`;
