import { deepClone } from 'utils';

export const findParentAndDoCallback = (parents, parentId, callback, callbackParams) => {
  return parents.map((comment) => {
    if (comment.id === parentId) {
      const clone = deepClone(comment);
      clone.replies = callback({ prevComments: clone.replies, ...callbackParams });
      return clone;
    }
    return comment;
  });
};

export const addLikeToComment = ({ prevComments, commentId, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === commentId) {
      const clone = deepClone(comment);
      clone.feelings.push(loggedInUserId);
      return clone;
    }
    return comment;
  });
};

export const removeLikeToComment = ({ prevComments, commentId, loggedInUserId }) => {
  return prevComments.map((comment) => {
    if (comment.id === commentId) {
      const clone = deepClone(comment);
      clone.feelings = [...clone.feelings].filter((userId) => userId !== loggedInUserId);
      return clone;
    }
    return comment;
  });
};
