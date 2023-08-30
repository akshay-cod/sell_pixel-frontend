export let __ENV = "prod";
let URL = "https://finscre-app.com"

if(__ENV == "dev"){
    URL = "https://dev-finscre.online/api"
}

if(__ENV == "local"){
    URL = "http://localhost:4001/api"
}

export const SOCKET_URL ="http://localhost:4000";
export const BASE_URL = __ENV == "prod" ?  URL+"/api" : URL ;
export const UPLOAD_URL=  __ENV == "prod" ? URL+"/upload" : "https://dev-finscre.online/upload";
export const PAYMENT_URL= __ENV == "prod" ? URL+"/api/pay" : "https://dev-finscre.online/api/pay";
//console.log(BASE_URL)