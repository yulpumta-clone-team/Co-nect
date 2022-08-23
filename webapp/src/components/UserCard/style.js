import styled from 'styled-components';
import { ReactComponent as LeftAngleIcon } from 'assets/icons/left-angle.svg';
import { ReactComponent as rightAngleIcon } from 'assets/icons/right-angle.svg';

// * : Card Container
export const CardWrapper = styled.div`
  position: relative;
  width: 368px;
  height: 429px;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

// * : 카드 상단 파란색 부분
export const CardTop = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  background: #036eff;
  border-radius: 10px 10px 0px 0px;
`;

export const Heart = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  > img {
    width: 40%;
    height: 100%;
  }
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
  align-items: flex-start;
  display: flex;
  width: 100%;
  height: 20%;
  background: #eaeaea;
  padding: 1em;
`;
// * : 직업 버튼 형식
export const Job = styled.div`
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
  width: 100%;
  height: 35%;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 1em;
`;

export const Name = styled.div`
  position: relative;
  display: grid;
  height: 40%;
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.subTitle}
  font-weight: 700;
`;

export const Team = styled.div`
  position: relative;
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 40%;

  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
  > img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
`;
export const Session = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;
  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;
// * : User가 선택한 기간
export const UserSession = styled.div`
  position: relative;
  display: flex;

  ${({ theme: { fonts } }) => fonts.korean.default}
`;
// * : 구분선
export const Divider = styled.div`
  top: 20px;
  height: 2px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale.nonActive};
`;
// * : 이동 버튼 포함 기술스택 정렬 박스
export const SkillBoard = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  > img {
    width: 10px;
    height: 60px;
    cursor: pointer;
  }
`;
// * : skill이 5개씩 보여지는 부분
export const SkillContainer = styled.div`
  position: relative;
  height: 60px;
  width: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;
// * : slideRef 로 지정한 하나의 슬라이드 style
export const Skill = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;
// * : 조회수와 댓글수가 보여지는 부분
export const CountBoard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 12%;
  width: 100%;
  padding: 1em;
  > img {
    width: 15%;
    height: 100%;
  }
`;

export const SkillImage = styled.img`
  object-fit: cover;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #cdcdcd;
`;

export const LeftAngle = styled(LeftAngleIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;

export const RightAngle = styled(rightAngleIcon)`
  & path {
    fill: ${({ theme: { colors } }) => colors.greyScale.black};
    stroke: ${({ theme: { colors } }) => colors.greyScale.black};
  }
`;
