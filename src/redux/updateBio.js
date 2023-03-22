export const UPDATE_PROFILE_BIO = "user/updateBio";

export const updatedProfileImg = (bio) => {
    return {
      type: UPDATE_PROFILE_BIO,
      payload: bio,
    };
  };