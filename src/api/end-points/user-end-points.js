export const REQUEST_AN_OTP = `otp`;

export const VERIFY_AN_OTP = 'verify-otp';

export const PROFILE = "user-profile-details";

export const USERS_SEARCH = (userName) => "users/"+ userName;

export const USER_DETAILS = (userId) => `user-details/${userId}`

export const UPDATE_USER = `user-details`;

//creations

export const CREATE_CREATION = "creations"

export const SINGLE_CREATION = (creationId) => `creations/${creationId}`

export const POPULAR_CREATIONS = "creations/home"

export const GET_NEW_FEED = "creations/feed"

//friends

export const ADD_AS_A_FRIENDS = "friends/add-friend";

export const USER_FRIENDS_LIST = "friends/all-friends"

//payments

export const CREATE_PAYMENT_ORDER = "payment/create-order";

export const VERIFY_PAYMENT_ORDER = "payment/verify";
