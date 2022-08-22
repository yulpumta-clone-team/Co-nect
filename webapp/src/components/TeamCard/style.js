import styled from 'styled-components';

export const CardTitle = styled.h2``;

export const ImgContainer = styled.div``;

export const SessionContainer = styled.div``;

// * : Card Container
export const CardWrapper = styled.li`
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
// * : Team 정보
export const TeamInfo = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 35%;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 1em;
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
  height: 40%;
  width: 100%;
  ${({ theme: { fonts } }) => fonts.korean.subTitle}
  font-weight: 700;
`;

export const Session = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;
  ${({ theme: { fonts } }) => fonts.korean.default}
  font-weight: 700;
`;
// * : User가 선택한 기간
export const UserSession = styled.li`
  position: relative;
  display: flex;
  left: 10px;

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
  display: flex;
  height: 20%;
  width: 100%;
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
export const Skills = styled.div`
  position: relative;
  display: flex;
  height: 60px;
  width: 300px;
  overflow: hidden;
  align-items: center;
`;
// * : slideRef 로 지정한 하나의 슬라이드 style
export const Skill = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 99%;
  align-items: center;
  justify-content: space-between;
`;
// * : 조회수와 댓글수가 보여지는 부분
export const CountBoard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 12%;
  width: 100%;
  justify-content: flex-end;
  padding: 1em;
  > img {
    width: 15%;
    height: 100%;
  }
`;
