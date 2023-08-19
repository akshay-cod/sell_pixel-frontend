import { getDynamicFileUrl } from "../../helpers/get-dynamic-file-url";

const PaymentStaus = ({type}) => {
    return(
        <div style={{height:"80vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div style={{marginBottom:0}}>
                    <img width="200px" src={type == "success" ? getDynamicFileUrl("sucess.png") :  getDynamicFileUrl("failure.png")}/>
                </div>
                <div style={{fontSize:20,fontWeight:"bold"}}>
                    {type == "success" ? "payment success" : "payment failure"}
                </div>
            </div>
        </div>
    )
}

export default PaymentStaus;