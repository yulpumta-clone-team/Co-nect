import PropTypes, { shape } from 'prop-types';
import { rawResponseTechStackType } from './techSkill.type';

export const loggedUserType = shape({
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  profileImg: PropTypes.string,
});

/**
 * @type {UserSchema}
 */
const userSchema = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(rawResponseTechStackType).isRequired,
  slogan: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
};

/**
 * @type {UserCardSchema}
 */
const userCardTypeSchema = {
  ...userSchema,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
};

/**
 * @type {UserDetailSchema}
 */
const userDetailTypeSchema = {
  id: PropTypes.number.isRequired,
  skills: PropTypes.arrayOf(rawResponseTechStackType).isRequired,
  slogan: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  commentCnt: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  hopeSession: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  likeCnt: PropTypes.number.isRequired,
  portfolio: PropTypes.string.isRequired,
  readCnt: PropTypes.number.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export const userType = shape(userSchema);

export const userCardType = shape(userCardTypeSchema);

export const userDetailType = shape(userDetailTypeSchema);
