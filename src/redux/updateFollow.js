export const FOLLOW_USER_SUCCESS = "FOLLOWER_USER_SUCCESS";
// export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";

export const followUserSuccess = (following) => ({
    type: FOLLOW_USER_SUCCESS,
    payload: following,
});

// export const unfollowUserSuccess = (userId) => ({
//     type: UNFOLLOW_USER_SUCCESS,
//     payload: userId,
// });