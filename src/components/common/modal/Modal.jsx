import { useEffect } from "react"
import { ModalInsideWrapper, ModalWrapper } from "./modal.styles"
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
    isVisible,
    component,
    setVisible,
    auth,
    color
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
            <ModalWrapper color={color}>
                <ModalInsideWrapper color={color}>
                    <div
                     style={{padding:10,float:"right",cursor:"pointer",display:auth ?"visible" : "none"}}
                    onClick={()=>{if(auth) setVisible(false)}}><AiOutlineClose color="black"/></div>
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