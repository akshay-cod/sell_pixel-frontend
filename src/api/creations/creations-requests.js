import axiosInstance from "../../axios/AxiosInstance"
import { CREATE_CREATION, SINGLE_CREATION } from "../end-points/user-end-points"

export const createAcreation = async (data) => {
    try{
        const res = await axiosInstance.post(CREATE_CREATION, data)
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

export const removeACreation = async (id) => {
  try{
      const res = await axiosInstance.put(SINGLE_CREATION(id))
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