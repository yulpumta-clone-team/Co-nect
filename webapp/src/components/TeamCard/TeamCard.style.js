import styled from 'styled-components';
import { ReactComponent as leftAngleIcon } from 'assets/icons/left-angle.svg';
import { ReactComponent as rightAngleIcon } from 'assets/icons/right-angle.svg';
import { ReactComponent as heartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as chatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as viewIcon } from 'assets/icons/view.svg';

// * : Card Container
export const CardWrapper = styled.li`
  position: relative;
  width: 260px;
  height: 300px;
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
  width: 260px;
  background-color: #036eff;
  border-radius: 10px 10px 0px 0px;
`;

// * : 지금은 Figma color 참고하여 div 태그로 구성하여 줬지만, 추후 img로 수정 필요.
export const BackgroundImg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 20%;
  background-color: #eaeaea;
  padding: 1rem;
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

export const HopeSession = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;
  height: 70%;
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

// * : 조회수와 댓글수가 보여지는 부분
export const CardInfoIndicator = styled.div`
  position: absolute;
  bottom: 1.2rem;
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
`;

// Icon
export const Heart = styled(heartIcon)`
  position: relative;
  display: flex;
  align-items: center;

  left: 14px;
  top: 6px;

  width: 20px;
  height: 20px;
`;
export const LeftAngle = styled(leftAngleIcon)`
  width: 8%;
  height: 60%;
  cursor: pointer;
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;
export const RightAngle = styled(rightAngleIcon)`
  width: 8%;
  height: 60%;
  cursor: pointer;
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;
export const Chat = styled(chatIcon)`
  width: 18px;
  height: 18px;
`;
export const View = styled(viewIcon)`
  width: 18px;
  height: 18px;
`;
