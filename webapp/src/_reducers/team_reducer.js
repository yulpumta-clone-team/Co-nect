import { handleCommentReducer } from 'utils/handleComment';
import {
  GET_TEAM_DETAIL,
  GET_TEAM__ARR,
  POST_TEAM_COMMENT,
  HANDLE_SECRET_TEAM_COMMENT,
  DELETE_TEAM_COMMENT,
  PATCH_TEAM_COMMENT,
  POST_TEAM_REPLY,
  DELETE_TEAM_REPLY,
  PATCH_TEAM_REPLY,
  HANDLE_SECRET_TEAM_REPLY,
  POST_TEAM_POST,
} from '_types/teamTypes';

const initState = {
  targetTeam: null,
  teamArray: [],
};

const userReducer = (state = initState, action) => {
  const { targetTeam } = state;
  const handlecomment = handleCommentReducer(state.targetTeam);
  switch (action.type) {
    case GET_TEAM_DETAIL:
      return { ...state, targetTeam: action.payload };
    case GET_TEAM__ARR:
      return { ...state, teamArray: action.payload };
    case POST_TEAM_POST:
      return { ...state };
    case POST_TEAM_COMMENT:
      return {
        ...state,
        targetTeam: { ...targetTeam, comments: handlecomment.postComment(action.payload) },
      };
    case DELETE_TEAM_COMMENT:
      return {
        ...state,
        targetTeam: {
          ...targetTeam,
          comments: handlecomment.deleteComment(action.payload),
        },
      };
    case PATCH_TEAM_COMMENT:
      return {
        ...state,
        targetTeam: {
          ...targetTeam,
          comments: handlecomment.patchComment(action.payload),
        },
      };
    case HANDLE_SECRET_TEAM_COMMENT:
      return {
        ...state,
        targetTeam: {
          ...targetTeam,
          comments: handlecomment.handleSecret(action.payload),
        },
      };
    case POST_TEAM_REPLY:
      return {
        ...state,
        targetUser: { ...targetTeam, comments: handlecomment.postRelpy(action.payload) },
      };
    case DELETE_TEAM_REPLY:
      return {
        ...state,
        targetTeam: { ...targetTeam, comments: handlecomment.deleteReply(action.payload) },
      };
    case PATCH_TEAM_REPLY:
      return {
        ...state,
        targetTeam: { ...targetTeam, comments: handlecomment.patchReply(action.payload) },
      };
    case HANDLE_SECRET_TEAM_REPLY:
      return {
        ...state,
        targetTeam: {
          ...targetTeam,
          comments: handlecomment.handleSecretReply(action.payload),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
