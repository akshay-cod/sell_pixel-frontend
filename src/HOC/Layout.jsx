import { useSelector } from "react-redux"
import { user } from "../store/feature/auth"
import { useEffect, useState } from "react"
import { Footer, Header } from "../components"
import Modal from "../components/common/modal/Modal"
import Login from "../pages/home/login/Login"
import NameInputModal from "../pages/home/nameInput/NameInputModal"

const Layout = ({visible,setVisible, children, nameModal, setNameModal}) => {
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

      useEffect(()=>{
        if( userDetails.auth && !userDetails?.user?.first_name){
          setNameModal(true)
        }
        else{
          setNameModal(false)
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
        <Modal isVisible={nameModal} setVisible={setNameModal} component={<NameInputModal setModal={setNameModal}/>} auth={false}/>
        </>
    )
}

export default Layout;