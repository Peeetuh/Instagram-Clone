export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";

export const unfollowUserSuccess = (following) => ({
    type: UNFOLLOW_USER_SUCCESS,
    payload: following,
})