import PropTypes, { shape } from 'prop-types';
import { userDetailType } from './user.type';

export const teamType = shape({
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  read: PropTypes.number.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
  user: userDetailType.isRequired, // 작성자 정보
});

export const teamCardType = shape({
  ...teamType,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
});

export const teamDetailType = shape({
  ...teamType,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
});
