import { GET_TEAM_DETAIL, GET_TEAM__ARR, PATCH_TEAM_POST } from '_types/teamTypes';

const initState = {
  targetTeam: null,
  teamArray: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TEAM_DETAIL:
      return { ...state, targetTeam: action.payload };
    case GET_TEAM__ARR:
      return { ...state, teamArray: action.payload };
    case PATCH_TEAM_POST:
      return { ...state, targetTeam: action.payload };
    default:
      return state;
  }
};

export default userReducer;
