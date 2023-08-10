import axiosInstance from "../../axios/AxiosInstance"
import { WITHDRAW } from "../end-points/user-end-points"

export const raiseAwithdrawRequest = async (data) => {
    try{
        const res = await axiosInstance.post(WITHDRAW,data)
           console.log(res.data)
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