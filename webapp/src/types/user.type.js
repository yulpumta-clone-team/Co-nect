import PropTypes, { shape } from 'prop-types';

export const userInfoType = shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
});

export const userCardType = shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.number).isRequired,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
});
