import PropTypes, { shape } from 'prop-types';

export const loggedUserType = shape({
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
});

const userSchema = {
  description: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  slogan: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

const userCardTypeSchema = {
  ...userSchema,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

const userDetailTypeSchema = {
  ...userSchema,
  commentCnt: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  likeCnt: PropTypes.number.isRequired,
  oauthId: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
};

export const userType = shape(userSchema);

export const userCardType = shape(userCardTypeSchema);

export const userDetailType = shape(userDetailTypeSchema);
