import commentApi from 'api/comment';

export function getComment({ postType, postId }) {
  return commentApi.GET_COMMENT({ postType, postId }).then((response) => response);
}

export function postComment(postType, newCommentData) {
  return commentApi.POST_COMMENT({ postType, data: newCommentData }).then((response) => response);
}
