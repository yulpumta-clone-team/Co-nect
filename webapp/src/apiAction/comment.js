import commentApi from 'api/comment';

export function getComment({ postType, postId }) {
  return commentApi.GET_COMMENT({ postType, postId }).then((response) => response);
}

export function postComment({ postType, newCommentData }) {
  return commentApi.POST_COMMENT({ postType, data: newCommentData }).then((response) => response);
}

export function postCommentLike({ postType, id }) {
  return commentApi.POST_COMMENT_LIKE({ postType, id }).then((response) => response);
}

export function patchComment({ postType, postId, newCommentData }) {
  return commentApi
    .PATCH_COMMENT({ postType, postId, data: newCommentData })
    .then((response) => response);
}

export function deleteComment({ postType, id }) {
  return commentApi.DELETE_COMMENT({ postType, id }).then((response) => response);
}
