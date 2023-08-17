export const __ENV = "prod";
let URL = "https://dev-finscre.online/api"

if(__ENV == "dev"){
    URL = "http://localhost:4001/api"
}

export const SOCKET_URL ="http://localhost:4000";
export const BASE_URL = URL ;
export const UPLOAD_URL="https://dev-finscre.online/upload";
export const PAYMENT_URL="https://dev-finscre.online/api/pay";