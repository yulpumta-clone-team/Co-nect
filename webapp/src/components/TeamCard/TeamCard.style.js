import styled, { css } from 'styled-components/macro';

// * : Card Container
export const CardWrapper = styled.li`
  cursor: pointer;
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

export const ProfileImg = css`
  position: absolute; // * : 각 div 상자에 걸쳐있는 프로필 이미지 때문에 absolute로 위치를 설정해 줌.
  display: flex;

  width: 100px;
  height: 100px;
  right: 12px;
  top: 60px;
  border-radius: 50%;
`;

// * : 지금은 Figma color 참고하여 div 태그로 구성하여 줬지만, 추후 img로 수정 필요.
export const BackgroundImg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 20%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.background};
  padding: 1.2rem;
`;

// * : Team 모집중 / 모집 안함 상태 나타내는 버튼
export const TeamStatus = styled.div`
  background-color: ${({ isRecruitng, theme: { colors } }) =>
    isRecruitng ? colors.secondary.normal : colors.greyScale.placeHolder};

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 78px;
  height: 28px;
  border-radius: 50px;

  color: ${({ theme: { colors } }) => colors.greyScale.white};
  ${({ theme: { fonts } }) => fonts.korean.default}
`;
// * : Team 정보
export const TeamInfo = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  width: 100%;
  height: 40%;
  padding: 1rem;
`;
export const UserName = styled.div`
  position: relative;
  display: flex;

  height: 17%;
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.emphasis}
`;
export const TeamName = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 40%;
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.subTitle}
  font-weight: 700;
`;

export const TeamSlogan = styled.div``;

export const HopeSession = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;
  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;

// * : Team이 선택한 기간
export const TeamHopeSession = styled.div`
  position: relative;
  display: flex;
  left: 10px;

  ${({ theme: { fonts } }) => fonts.korean.default}
`;
// * : 구분선
export const Divider = styled.div`
  height: 2px;
  width: 100%;

  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
`;

export const TechSkills = css`
  padding: 12px 0;
`;

// * : 조회수와 댓글수가 보여지는 부분
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
  > svg {
    & path {
      stroke: ${({ theme: { colors } }) => colors.primary.normal};
      fill: ${({ theme: { colors } }) => colors.primary.normal};
    }
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
