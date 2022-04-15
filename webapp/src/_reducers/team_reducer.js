import { GET_TEAM_DETAIL, GET_TEAM__ARR } from '_types/teamTypes';

const initState = {
  targetTeam: null,
  teamArray: [],
};

const userReducer = (state = initState, action) => {
  const { targetTeam } = state;
  switch (action.type) {
    case GET_TEAM_DETAIL:
      return { ...state, targetTeam: action.payload };
    case GET_TEAM__ARR:
      return { ...state, teamArray: action.payload };
    default:
      return state;
  }
};

export default userReducer;
