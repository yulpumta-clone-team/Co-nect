import PropTypes, { shape } from 'prop-types';

export const teamCardType = shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  read: PropTypes.number.isRequired,
  skills: PropTypes.arrayOf(PropTypes.number).isRequired,
  commentCnt: PropTypes.number.isRequired,
  likeCnt: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});
