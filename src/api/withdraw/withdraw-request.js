import axiosInstance from "../../axios/AxiosInstance"
import { TRANSACTIONS, WITHDRAW, WITHDRAW_LIST } from "../end-points/user-end-points"

export const raiseAwithdrawRequest = async (data) => {
    try{
        const res = await axiosInstance.post(WITHDRAW,data)
   
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

export const listWithdrawalsOfUser = async () => {
  try{
      const res = await axiosInstance.get(WITHDRAW_LIST)
 
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

export const listWithdrawalsOfUserPaginated = async (page) => {
  try{
      const res = await axiosInstance.get(WITHDRAW_LIST+"?skip="+page
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

export const listTransactionsOfUser = async () => {
  try{
      const res = await axiosInstance.get(TRANSACTIONS)
 
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

export const listTransactionsOfUserPaginated = async (page) => {
  try{
      const res = await axiosInstance.get(TRANSACTIONS+"?skip="+page
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