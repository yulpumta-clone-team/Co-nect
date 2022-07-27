import PropTypes, { shape } from 'prop-types';

export const loggedUserType = shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
});

export const userType = shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.bool.isRequired,
});

export const userCardType = shape({
  ...userType,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
});

export const userDetailType = shape({
  ...userType,
  oauthId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
});
