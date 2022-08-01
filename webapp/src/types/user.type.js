import PropTypes, { shape } from 'prop-types';

export const loggedUserType = shape({
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
});

export const userType = shape({
  description: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  slogan: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
});

export const userCardType = shape({
  ...userType,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
});

export const userDetailType = shape({
  ...userType,
  commentCnt: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  likeCnt: PropTypes.number.isRequired,
  oauthId: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
});
