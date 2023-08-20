
import axiosInstance from "../../axios/AxiosInstance"
import { PROFILE, PURCHASES, REQUEST_AN_OTP, SOLD, UPDATE_USER, USERS_SEARCH, USER_DETAILS, USER_DETAILS_NO_AUTH, VERIFY_AN_OTP } from "../end-points/user-end-points"

export const requestForOtp = async (phoneNumber) => {
    try{
        const res = await axiosInstance.post(REQUEST_AN_OTP,
            {
                phoneNumber:phoneNumber
            })
            console.log(res)
            return{
                ...res.data,
                status:true
            }
            
    }
    catch(err){
      console.log(err)
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const verifyAnOtp = async (phoneNumber, ginger, otpCode) => {
    try{
        const res = await axiosInstance.post(VERIFY_AN_OTP,
            {
                otp:otpCode,
                ginger:ginger,
                phoneNumber:phoneNumber
            })
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const getProfileDetails = async () => {
    try{
        const res = await axiosInstance.get(PROFILE)
         
            return{
                ...res?.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}


export const getUserByUserId = async (userId, page) => {
    try{
        const res = await axiosInstance.get(USER_DETAILS(userId)+"?skip="+page)
         
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const getUserByUserIdNoAuth = async (userId, page) => {
    try{
        const res = await axiosInstance.get(USER_DETAILS_NO_AUTH(userId))
       
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const updateAnUserDetails = async (data) => {
    try{
        const res = await axiosInstance.put(UPDATE_USER,
            data
            )
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const getAnUserPurchases = async () => {
    try{
        const res = await axiosInstance.get(PURCHASES
            )
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const getAnUserPurchasesPaginated = async (page) => {
    try{
        const res = await axiosInstance.get(PURCHASES+"?skip="+page
            )
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}


export const getAnUserSellings = async () => {
    try{
        const res = await axiosInstance.get(SOLD
            )
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}

export const getAnUserSellingsPaginated = async (page) => {
    try{
        const res = await axiosInstance.get(SOLD+"?skip="+page
            )
            return{
                ...res.data,
                status:true
            }

    }
    catch(err){
      return {
        status:false,
        message:err.response.data.message
      }
    }
}