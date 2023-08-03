import axios from 'axios';
import { BASE_URL } from '../configs/urls/urls';

// const token = async () => {
//     try {
//         const value = await getAToken();
//         if (value !== null) {
//           return value;
//         }
//       } catch (error) {
//         return ""
//       }
// }

axios.defaults.baseURL = BASE_URL

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  async config => {
    const userToken = await localStorage.getItem("token")
    if (userToken) {
      config.headers.authorization = 'Bearer ' + userToken
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

export default axiosInstance;