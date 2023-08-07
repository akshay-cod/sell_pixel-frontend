export const REQUEST_AN_OTP = `otp`;

export const VERIFY_AN_OTP = 'verify-otp';

export const PROFILE = "user-profile-details";

export const USERS_SEARCH = (userName) => "users/"+ userName;

export const USER_DETAILS = (userId, skip) => {
  let url = `user-details/${userId}`+ `${skip > 0 ? `?skip=${skip}` :""}` 
  console.log(url,skip,"url")
  return url
}

export const USER_DETAILS_NO_AUTH = (userId) => {
  let url = `no-auth/user-details/${userId}`;
  return url
}

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

//kyc

export const KYC_DETAILS = "kyc"

//bank

export const BANK_DETAILS = "add/bank-details"

export const GET_BANK_DETAILS = "get/bank-details"