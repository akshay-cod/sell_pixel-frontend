import axiosInstance from "../../axios/AxiosInstance"
import { KYC_DETAILS } from "../end-points/user-end-points"

export const getKycDetails = async () => {
    try{
        const res = await axiosInstance.get(KYC_DETAILS)
        
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


export const postKycDetails = async (data) => {
    try{
        const res = await axiosInstance.post(KYC_DETAILS,data)
     
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

export const updateKycDetails = async (data) => {
    try{
        const res = await axiosInstance.put(KYC_DETAILS,data)
       
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