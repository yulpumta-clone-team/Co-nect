import styled from 'styled-components';
import { ReactComponent as leftAngleIcon } from 'assets/icons/left-angle.svg';
import { ReactComponent as rightAngleIcon } from 'assets/icons/right-angle.svg';
import { ReactComponent as heartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as checkIcon } from 'assets/icons/check-button.svg';
import { ReactComponent as crossIcon } from 'assets/icons/cross-button.svg';
import { ReactComponent as chatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as viewIcon } from 'assets/icons/view.svg';
import { userCardType } from 'types/user.type';

const belong_team = userCardType;
const teamIcon = belong_team ? checkIcon : crossIcon;

// * : Card Container
export const CardWrapper = styled.div`
  position: relative;
  width: 368px;
  height: 429px;
  background-color: ${({ theme: { colors } }) => colors.greyScale.white};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

// * : 카드 상단 파란색 부분
export const CardTop = styled.div`
  position: relative;
  display: flex;

  height: 10%;
  width: 100%;
  background-color: #036eff;
  border-radius: 10px 10px 0px 0px;
`;

export const ProfileImg = styled.img`
  position: absolute; // * : 각 div 상자에 걸쳐있는 프로필 이미지 때문에 absolute로 위치를 설정해 줌.
  display: flex;

  width: 100px;
  height: 100px;
  left: 243px;
  top: 80px;

  border-radius: 50%;
`;
// * : 지금은 Figma color 참고하여 div 태그로 구성하여 줬지만, 추후 img로 수정 필요.
export const BackgroundImg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;

  width: 100%;
  height: 20%;
  background-color: #eaeaea;
  padding: 1em;
`;
// * : 직업 버튼 형식
export const UserJob = styled.div`
  background-color: ${({ theme: { colors } }) => colors.secondary.normal};

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
// * : User 정보
export const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  width: 100%;
  height: 35%;
  padding: 1em;
`;

export const UserName = styled.div`
  position: relative;
  display: grid;

  height: 40%;
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.subTitle}
  font-weight: 700;
`;

export const TeamBelongBoard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 40%;

  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;
export const HopeSession = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;
  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;
// * : User가 선택한 기간
export const UserHopeSession = styled.div`
  position: relative;
  display: flex;
  width: 35%;
  justify-content: center;

  ${({ theme: { fonts } }) => fonts.korean.default}
`;
// * : 구분선
export const Divider = styled.div`
  top: 20px;
  height: 2px;
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale.nonActive};
`;
// * : 이동 버튼 포함 기술스택 정렬 박스
export const SkillBoard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 20%;
  width: 100%;
  padding: 5px 0px;
`;
// * : skill이 5개씩 보여지는 부분
export const SkillContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;
  overflow: hidden;
`;
// * : slideRef 로 지정한 하나의 슬라이드 style
export const SkillSlide = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  gap: 12px;
`;
// ! : 카드에 보여지는 기술 개수가 4개로 변경 됐을 시 삼항연산자로 gap을 다르게 줘야합니다.
// ! : 하지만, 지금 당장 그 조건을 주면 4개만 있을 때 gap차이가 달라져 각 Card들끼리 정돈되어 보이지 않을것이라고 판단했습니다.
// ! : 변경 시 수정 필요 !
// ! : 박스 길이(100% - (8%+8%)=84%) / (gap 크기(12px) * (viewingSkill + 1))

export const SkillImage = styled.img`
  object-fit: cover;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #cdcdcd;
`;

// * : 조회수와 댓글수가 보여지는 부분
export const CountBoard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 12%;
  width: 100%;
  padding: 1rem;
`;

// Icon
export const Heart = styled(heartIcon)`
  position: relative;
  display: flex;
  align-items: center;
  left: -50px;
  top: 12px;

  width: 40%;
  height: 40%;
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

// * : team 소속 여부 아이콘
export const TeamBelong = styled(teamIcon)`
  width: 20px;
  height: 20px;
  object-fit: cover;
`;
export const Chat = styled(chatIcon)`
  width: 15%;
  height: 100%;
`;
export const View = styled(viewIcon)`
  width: 15%;
  height: 100%;
`;
