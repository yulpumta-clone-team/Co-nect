/* eslint-disable no-case-declarations */
import {
  POST_COMMENT,
  PATCH_COMMENT,
  DELETE_COMMENT,
  HANDLE_SECRET_COMMENT,
  POST_REPLY,
  PATCH_REPLY,
  DELETE_REPLY,
  HANDLE_SECRET_REPLY,
  PATCH_COMMENT_LIKE,
  GET_COMMENT,
} from '_types/commentType';

const initState = {
  postType: null,
  postId: null,
  commentData: null,
};

const commentReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_COMMENT:
      const { comments, postType, postId } = payload;
      return { ...state, commentData: comments, postType, postId };
    case POST_COMMENT:
      return { ...state };
    case PATCH_COMMENT:
      return { ...state };
    case DELETE_COMMENT:
      return { ...state };
    case HANDLE_SECRET_COMMENT:
      return { ...state };
    case POST_REPLY:
      return { ...state };
    case PATCH_REPLY:
      return { ...state };
    case DELETE_REPLY:
      return { ...state };
    case HANDLE_SECRET_REPLY:
      return { ...state };
    case PATCH_COMMENT_LIKE:
      return { ...state };
    default:
      return state;
  }
};

export default commentReducer;
