export const UPDATE_PROFILE_IMG = "user/updateProfileImg";

export const updatedProfileImg = (profileImg) => {
    return {
      type: UPDATE_PROFILE_IMG,
      payload: profileImg,
    };
  };