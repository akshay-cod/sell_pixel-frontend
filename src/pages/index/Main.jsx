import { useSelector } from "react-redux";
import MainImage from "../../assets/sacc.png"
import { user } from "../../store/feature/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Main = ({setLoginVisible}) => {
    const UserRedux = useSelector(user)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!UserRedux.auth && !UserRedux?.loading){
            setLoginVisible(true)
        }
    },[])

    const handleExploreBtn = () => {
        if(UserRedux.auth){
            navigate(`/${UserRedux?.user?._id}`)
        }
        else{
            setLoginVisible(true)
        }
    }

    return(
        <div style={{display:"flex",padding:"30px 20%",height:"80vh", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
            <div
             style={{fontSize:40, fontWeight:"bold",textAlign:"center"}}
            >
                Welcome to FinsCRE
                <div  style={{fontSize:12, fontWeight:400}}>
                    sell your profile and content seemlesly
                </div>
            </div>
            <div>
                <img src={MainImage} alt="image" width="100%"/>
            </div>
            <div onClick={handleExploreBtn} style={{background:"rgb(43, 43, 43)", cursor:"pointer",padding:"10px 25px", borderRadius:10, fontSize:14}}>
                Explore
            </div>
        </div>
    )
}

export default Main;