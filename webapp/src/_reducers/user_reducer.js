import { GET_USER_DETAIL, GET_USER__ARR, PATCH_USER_PROFILE } from '_types/userTypes';

const initState = {
  targetUser: {
    user_id: '',
    name: '',
    content: '',
    session: '',
    img: '',
    skills: [],
    read: '',
    job: '',
    comment_cnt: '',
    like_cnt: '',
    createdAt: '',
    updatedAt: '',
    comments: '',
  },
  userArray: [],
};

const userReducer = (state = initState, action) => {
  const { targetUser } = state;
  switch (action.type) {
    case GET_USER_DETAIL:
      return { ...state, targetUser: action.payload };
    case GET_USER__ARR:
      return { ...state, userArray: action.payload };
    case PATCH_USER_PROFILE:
      return { ...state, targetUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
