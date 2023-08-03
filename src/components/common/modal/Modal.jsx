import { useEffect } from "react"
import { ModalInsideWrapper, ModalWrapper } from "./modal.styles"
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
    isVisible,
    component,
    setVisible,
    auth
}) => {

    useEffect(()=>{
        const body = document.querySelector("body");
        if(isVisible){
            body.style.overflow = "hidden";
        }
        else{
            body.style.overflow = "auto";
        }
    },[isVisible])
    return(
       <>
        {
            isVisible ? 
            <ModalWrapper>
                <ModalInsideWrapper>
                    <div
                     style={{padding:10,float:"right",cursor:"pointer"}}
                    onClick={()=>{if(auth) setVisible(false)}}><AiOutlineClose/></div>
                {component}
                </ModalInsideWrapper>
            </ModalWrapper>
            :
            ""
        }
       </> 
    )
}
export default Modal