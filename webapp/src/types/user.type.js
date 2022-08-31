import PropTypes, { shape } from 'prop-types';
import { rawResponseTechStackType } from './techSkill.type';

export const loggedUserType = shape({
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
});

const userSchema = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(rawResponseTechStackType).isRequired,
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
  job: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  commentCnt: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  likeCnt: PropTypes.number.isRequired,
  oauthId: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
};

const userEditTypeSchema = {
  ...userSchema,
  job: PropTypes.string,
  img: PropTypes.string,
  hopeSession: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  portfolio: PropTypes.string,
  email: PropTypes.string.isRequired,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
  oauthId: PropTypes.string.isRequired,
};

export const userType = shape(userSchema);

export const userCardType = shape(userCardTypeSchema);

export const userDetailType = shape(userDetailTypeSchema);

export const userEditType = shape(userEditTypeSchema);
