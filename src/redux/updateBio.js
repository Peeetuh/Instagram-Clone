export const UPDATE_PROFILE_BIO = "user/updateBio";

export const updatedBio = (bio) => {
    return {
      type: UPDATE_PROFILE_BIO,
      payload: bio,
    };
  };