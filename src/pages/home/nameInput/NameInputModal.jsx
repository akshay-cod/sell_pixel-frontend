
import { useState } from "react";
import {LoginHeaderDesc, PhoneNumberInput, SendOtpButton, Wrapper } from "./name-input.styles";
import { updateAnUserDetails } from "../../../api/auth/auth-request";
import { toast } from "react-toastify";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import { useDispatch } from "react-redux";
import { checkUserLoggedIn } from "../../../store/feature/auth";
import { isValidEmail } from "../../../helpers/validations";

const NameInputModal = ({setModal}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch()

    const onSubmit = async () => {
        setLoading(true)
        if(name?.trim().length > 50){
            toast.error("name should be less than 50 characters")  
            setLoading(false)  
            return;
        }
        if(name?.trim().length < 2){
            toast.error("name should be greater than 2 characters")  
            setLoading(false)  
            return;
        }
        if(!isValidEmail(email)){
            toast.error("enter a valid email")  
            setLoading(false)  
            return;
        }
        const res = await updateAnUserDetails({firstName:name,email:email})
        if(res){
            toast.success("thank you !! updated successfully")
            setModal(false)
            dispatch(checkUserLoggedIn())
        }
        setLoading(false)  
    }

    return(
      <div>
        <Wrapper>
            <LoginHeaderDesc></LoginHeaderDesc>
            <PhoneNumberInput value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name"/>
            <LoginHeaderDesc></LoginHeaderDesc>
            <PhoneNumberInput s value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
            {loading ? <div style={{display:"flex", justifyContent:"center"}}>
                <SimpleLoader black={true}></SimpleLoader>
                </div> : <SendOtpButton onClick={onSubmit}>Submit</SendOtpButton>}
        </Wrapper>
      </div>
    )
}

export default NameInputModal;