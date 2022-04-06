import { USER } from 'constant';
import {
  deleteUserComment,
  deleteUserReply,
  handleSecretUserComment,
  handleSecretUserReply,
  patchUserComment,
  patchUserReply,
  postUserComment,
  postUserReply,
} from 'apiAction/user';
import {
  deleteTeamComment,
  deleteTeamReply,
  handleSecretTeamComment,
  handleSecretTeamReply,
  patchTeamComment,
  patchTeamReply,
  postTeamComment,
  postTeamReply,
} from 'apiAction/team';

export function handleComment(type, dispatch) {
  const isUser = type === USER;
  return {
    postComment(dataToSubmit) {
      isUser ? dispatch(postUserComment(dataToSubmit)) : dispatch(postTeamComment(dataToSubmit));
    },
    deleteComment(dataToSubmit) {
      isUser
        ? dispatch(deleteUserComment(dataToSubmit))
        : dispatch(deleteTeamComment(dataToSubmit));
    },
    patchComment(dataToSubmit) {
      isUser ? dispatch(patchUserComment(dataToSubmit)) : dispatch(patchTeamComment(dataToSubmit));
    },
    handleSecret(dataToSubmit) {
      isUser
        ? dispatch(handleSecretUserComment(dataToSubmit))
        : dispatch(handleSecretTeamComment(dataToSubmit));
    },
    postReply(dataToSubmit) {
      isUser ? dispatch(postUserReply(dataToSubmit)) : dispatch(postTeamReply(dataToSubmit));
    },
    deleteReply(dataToSubmit) {
      isUser ? dispatch(deleteUserReply(dataToSubmit)) : dispatch(deleteTeamReply(dataToSubmit));
    },
    patchReply(dataToSubmit) {
      isUser ? dispatch(patchUserReply(dataToSubmit)) : dispatch(patchTeamReply(dataToSubmit));
    },
    handleSecretReply(dataToSubmit) {
      isUser
        ? dispatch(handleSecretUserReply(dataToSubmit))
        : dispatch(handleSecretTeamReply(dataToSubmit));
    },
  };
}

export function handleCommentReducer(target) {
  const targetElement = target;
  return {
    postComment(payload) {
      return [...targetElement.comments, payload];
    },
    deleteComment(payload) {
      return [...targetElement.comments].filter((comment) => comment.id !== payload);
    },
    patchComment(payload) {
      const { id } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === id) {
          return payload;
        }
        return comment;
      });
    },
    handleSecret(payload) {
      const { id, updatedAt } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === id) {
          return { ...comment, isSecret: !comment.isSecret, updatedAt };
        }
        return comment;
      });
    },
    postRelpy(payload) {
      const { parent_id } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === parent_id) {
          comment.replies = [...comment.replies, payload];
        }
        return comment;
      });
    },
    deleteReply(payload) {
      const { parent_id, id } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === parent_id) {
          comment.replies = [...comment.replies].filter((reply) => reply.id !== id);
        }
        return comment;
      });
    },
    patchReply(payload) {
      const { parent_id, id } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === parent_id) {
          comment.replies = comment.replies.map((reply) => {
            if (reply.id === id) {
              return payload;
            }
            return reply;
          });
        }
        return comment;
      });
    },
    handleSecretReply(payload) {
      const { id, parent_id, updatedAt } = payload;
      return [...targetElement.comments].map((comment) => {
        if (comment.id === parent_id) {
          comment.replies = comment.replies.map((reply) => {
            if (reply.id === id) {
              return { ...reply, isSecret: !reply.isSecret, updatedAt };
            }
            return reply;
          });
        }
        return comment;
      });
    },
  };
}
