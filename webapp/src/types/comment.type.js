import PropTypes, { shape } from 'prop-types';

const commonCommentSchema = {
  content: PropTypes.string.isRequired,
  feelings: PropTypes.arrayOf(PropTypes.shape({ userId: PropTypes.string })),
  id: PropTypes.string.isRequired,
  secret: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const commentInfoSchema = {
  ...commonCommentSchema,
  parentId: PropTypes.string,
  replies: PropTypes.array.isRequired,
};

const replyCommentInfoSchema = {
  ...commonCommentSchema,
  parentId: PropTypes.string.isRequired,
  replies: PropTypes.array,
};

const commentSchema = {
  id: PropTypes.string.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  ...commentInfoSchema,
};

export const commentInfoType = shape(commentInfoSchema);

export const replyCommentInfoType = shape(replyCommentInfoSchema);

export const commentType = shape(commentSchema);
