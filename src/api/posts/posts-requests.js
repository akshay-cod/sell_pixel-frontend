import axiosInstance from "../../axios/AxiosInstance"
import { SINGLE_CREATION, USER_DETAILS } from "../end-points/user-end-points"

export const getProfileDetails = async (id, skip) => {
    try{
        const res = await axiosInstance.get(USER_DETAILS(id ||"645d34643e09f833f450e67d",skip))
      
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

export const getAPostDetails = async (id) => {
  try{
      const res = await axiosInstance.get(SINGLE_CREATION(id))
    
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