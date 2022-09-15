import styled from 'styled-components';
import { ReactComponent as blueHeartIcon } from 'assets/icons/blue-heart.svg';

export const Heart = styled.div`
  width: 25px;
  height: 25px;
`;

export const EmptyHeart = styled(blueHeartIcon)`
  width: 25px;
  height: 25px;
`;

export const FilledHeart = styled(blueHeartIcon)`
  background-color: ${({ theme: { colors } }) => colors.primary.normal};
  width: 25px;
  height: 25px;
`;
