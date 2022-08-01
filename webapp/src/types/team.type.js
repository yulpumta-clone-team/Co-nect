import PropTypes, { shape } from 'prop-types';
import { userDetailType } from './user.type';

const teamSchema = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  read: PropTypes.number.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
  user: userDetailType.isRequired, // 작성자 정보
};

const teamCardTypeSchema = {
  ...teamSchema,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

const teamDetailTypeSchema = {
  ...teamSchema,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

export const teamType = shape(teamSchema);

export const teamCardType = shape(teamCardTypeSchema);

export const teamDetailType = shape(teamDetailTypeSchema);
