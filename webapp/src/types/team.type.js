import PropTypes, { shape } from 'prop-types';
import { rawResponseTechStackType } from './techSkill.type';

/**
 * @type {TeamSchema}
 */
const teamSchema = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(rawResponseTechStackType).isRequired,
  session: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
};

/**
 * @type {TeamCardSchema}
 */
const teamCardTypeSchema = {
  ...teamSchema,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
  readCnt: PropTypes.number.isRequired,
};

/**
 * @type {TeamDetailSchema}
 */
const teamDetailTypeSchema = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(rawResponseTechStackType).isRequired,
  session: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
  readCnt: PropTypes.number.isRequired,
};

export const teamType = shape(teamSchema);

export const teamCardType = shape(teamCardTypeSchema);

export const teamDetailType = shape(teamDetailTypeSchema);
