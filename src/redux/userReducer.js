import { UPDATE_PROFILE_BIO } from "./updateBio";
import { UPDATE_PROFILE_IMG } from "./updateProfileImg";
import { FOLLOW_USER_SUCCESS } from "./updateFollow";
import { UNFOLLOW_USER_SUCCESS } from "./unFollow";

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
        case FOLLOW_USER_SUCCESS:
          return{
            ...state,
            user:{
              ...state.user,
              following: [...state.user.following, action.payload]
            },
          }
        case UNFOLLOW_USER_SUCCESS:
          return{
            ...state,
            user:{
              ...state.user,
              following: state.user.following.filter(
                (id) => id !== action.payload
              )
            },
          }
        default:
          return initialState
  }
};
