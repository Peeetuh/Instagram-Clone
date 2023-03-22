import { UPDATE_PROFILE_BIO } from "./updateBio";
import { UPDATE_PROFILE_IMG } from "./updateProfileImg";

const initialState = {
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload, //whatever that's in the state
      };
    case "LOGIN_ERROR":
      return initialState;
      case UPDATE_PROFILE_IMG:
        return{
          ...state,
          user: {
            ...state.user,
            profileImg: action.payload,
          },
        };
      case UPDATE_PROFILE_BIO:
        return{
          ...state,
          user: {
            ...state.user,
            bio: action.payload
          },
        };
        default:
          return initialState
  }
};
