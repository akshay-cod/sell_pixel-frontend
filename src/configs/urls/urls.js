const __ENV = "prod";
let URL = "http://156.67.218.228/api"

if(__ENV == "dev"){
    URL = "http://localhost:4001/api"
}

export const SOCKET_URL ="http://localhost:4000";
export const BASE_URL = URL ;
export const UPLOAD_URL="http://156.67.218.228/upload";
export const PAYMENT_URL="http://156.67.218.228/api/pay";