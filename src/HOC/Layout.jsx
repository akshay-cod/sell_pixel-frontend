import { useSelector } from "react-redux"
import { user } from "../store/feature/auth"
import { useEffect, useState } from "react"
import { Footer, Header } from "../components"
import Modal from "../components/common/modal/Modal"
import Login from "../pages/home/login/Login"

const Layout = ({visible,setVisible, children}) => {
    const userDetails = useSelector(user)
    
    useEffect(()=>{
        if(userDetails?.loading) return
        if(!userDetails.auth){
        //  setVisible(true)
        }
        else{
          setVisible(false)
        }
      },[userDetails])
    return(
        <>
        <Header setVisible={setVisible}/>
        {
            children
        }
        <Footer/>
        <Modal isVisible={visible} setVisible={setVisible} component={<Login setVisible={setVisible}/>} auth={userDetails?.auth}/>
        </>
    )
}

export default Layout;