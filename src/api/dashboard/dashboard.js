import axiosInstance from "../../axios/AxiosInstance"
import { DASHBOARD } from "../end-points/user-end-points"

export const getDashboardDetails = async () => {
    try{
        const res = await axiosInstance.get(DASHBOARD)
         
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