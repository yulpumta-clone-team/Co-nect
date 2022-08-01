import PropTypes, { shape } from 'prop-types';

export const commentInfoType = shape({
  img: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  feeling: PropTypes.array.isRequired,
  parentId: PropTypes.number,
});

export const commentType = shape({
  id: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  commentInfo: commentInfoType,
});
