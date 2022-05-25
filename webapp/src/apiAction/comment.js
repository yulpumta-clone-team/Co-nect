import commentApi from 'api/comment';

export const getComment = ({ postType, postId }) =>
  commentApi.GET_COMMENT({ postType, postId }).then((response) => response);

export const postComment = ({ postType, newCommentData }) =>
  commentApi.POST_COMMENT({ postType, data: newCommentData }).then((response) => response);

export const patchComment = ({ postType, id, newCommentData }) =>
  commentApi.PATCH_COMMENT({ postType, id, data: newCommentData }).then((response) => response);

export const deleteComment = ({ postType, id }) =>
  commentApi.DELETE_COMMENT({ postType, id }).then((response) => response);

export const postReply = ({ postType, newCommentData }) =>
  commentApi.POST_REPLY({ postType, data: newCommentData }).then((response) => response);

export const patchReply = ({ postType, id, newCommentData }) =>
  commentApi.PATCH_REPLY({ postType, id, data: newCommentData }).then((response) => response);

export const patchCommentLike = ({ postType, id }) =>
  commentApi.PATCH_COMMENT_LIKE({ postType, id }).then((response) => response);

export const patchCommentUnLike = ({ postType, id }) =>
  commentApi.PATCH_COMMENT_UN_LIKE({ postType, id }).then((response) => response);
