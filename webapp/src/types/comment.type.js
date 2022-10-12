import PropTypes, { shape } from 'prop-types';

const commentInfoSchema = {
  content: PropTypes.string.isRequired,
  feelings: PropTypes.arrayOf(PropTypes.shape({ userId: PropTypes.number })),
  id: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  replies: PropTypes.number.isRequired,
  secret: PropTypes.number.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
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
