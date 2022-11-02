import PropTypes, { shape } from 'prop-types';

const commonCommentSchema = {
  content: PropTypes.string.isRequired,
  feelings: PropTypes.arrayOf(PropTypes.shape({ userId: PropTypes.number })),
  id: PropTypes.number.isRequired,
  secret: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const commentInfoSchema = {
  ...commonCommentSchema,
  parentId: PropTypes.number,
  replies: PropTypes.array.isRequired,
};

const replycommentInfoSchema = {
  ...commonCommentSchema,
  parentId: PropTypes.number.isRequired,
  replies: PropTypes.array,
};

const commentSchema = {
  id: PropTypes.number.isRequired,
  isSecret: PropTypes.bool.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  ...commentInfoSchema,
};

export const commentInfoType = shape(commentInfoSchema);

export const replyCommentInfoType = shape(replycommentInfoSchema);

export const commentType = shape(commentSchema);
