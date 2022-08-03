import PropTypes, { shape } from 'prop-types';

const commentInfoSchema = {
  img: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
  writer: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  feeling: PropTypes.array.isRequired,
  parentId: PropTypes.number,
};

const commentSchema = {
  id: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  ...commentInfoSchema,
};

export const commentInfoType = shape(commentInfoSchema);

export const commentType = shape(commentSchema);
