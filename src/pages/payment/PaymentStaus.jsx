import { getDynamicFileUrl } from "../../helpers/get-dynamic-file-url";
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentStaus = ({type}) => {
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <div style={{height:"80vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div style={{marginBottom:0}}>
                    <img width="200px" src={type == "success" ? getDynamicFileUrl("sucess.png") :  getDynamicFileUrl("failure.png")}/>
                </div>
                <div style={{fontSize:30,fontWeight:"bold"}}>
                    {type == "success" ? "payment success" : "payment failure"}
                </div>
                <div>
                    {type == "success" ? <div
                    onClick={()=>{navigate(location.state?.link)}}
                     style={{cursor:"pointer",background:"green",padding:"5px 20px", borderRadius:5, fontSize:16,fontWeight:"bold", marginTop:10}}
                    >view</div> : <div 
                    style={{cursor:"pointer",background:"red",padding:"5px 20px", borderRadius:5, fontSize:16,fontWeight:"bold", marginTop:10}}
                    onClick={()=>{navigate(location.state?.link)}}>retry</div>}
                </div>
            </div>
        </div>
    )
}

export default PaymentStaus;