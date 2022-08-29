import styled, { css } from 'styled-components';
import { ReactComponent as leftAngleIcon } from 'assets/icons/left-angle.svg';
import { ReactComponent as rightAngleIcon } from 'assets/icons/right-angle.svg';

export const Container = styled.div``;

// * : 이동 버튼 포함 기술스택 정렬 박스
export const SkillBoard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 0%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  && {
    ${({ customStyle }) => customStyle}
  }
`;

// * : slideRef 로 지정한 하나의 슬라이드 style
export const SkillSlide = styled.div`
  padding: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ gap }) => gap || '11px'};
  width: 100%;
  height: 100%;
  ${({ isCarousel }) =>
    !isCarousel &&
    css`
      flex-wrap: wrap;
      flex: 1 1 0%;
      justify-content: flex-start;
    `}
`;

// * : skill이 5개씩 보여지는 부분
export const SkillContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  ${({ isCarousel }) =>
    isCarousel &&
    css`
      overflow: hidden;
    `}
`;

// ! : 변경 시 수정 필요 !
// ! : 박스 길이(100% - (8%+8%)=84%) / (gap 크기(12px) * (viewingSkill + 1))

export const SkillImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px #cdcdcd;
  & {
    ${({ imageSize }) => css`
      width: ${imageSize};
      height: ${imageSize};
    `}
  }
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
