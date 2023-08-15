import axiosInstance from "../../axios/AxiosInstance"
import { GET_BANK_DETAILS ,BANK_DETAILS} from "../end-points/user-end-points"

export const getBankDetails = async (data) => {
    try{
        const res = await axiosInstance.get(GET_BANK_DETAILS)
      
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

export const saveABankDetails = async (data) => {
    try{
        const res = await axiosInstance.post(BANK_DETAILS, data)
          
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