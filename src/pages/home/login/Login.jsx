import { useEffect, useState } from "react";
import { LoginHeader, LoginHeaderDesc, PhoneNumberInput, SendOtpButton, Wrapper } from "./login.styles";
import { requestForOtp, verifyAnOtp } from "../../../api/auth/auth-request";
import { loginUser, user } from "../../../store/feature/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";

const Login = ({setVisible}) => {
    const [screen, setScreen] = useState(1);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [seconds, setSeconds] = useState(60);

    const [authData, setAuthData] = useState({});

    const users = useSelector(user);
    const dispatch = useDispatch();
    console.log(users,"user")

    // useEffect(()=>{
    //     if (seconds > 0) {
    //         setTimeout(() => setSeconds(seconds - 1), 1000);
    //       } else {
    //         setSeconds(0);
    //       }
    // })

    const onClickSendOtp = async (number) => {
        try{
            setLoading(true);
            if(!number){
                toast.error("please enter a phonenumber")
                setLoading(false);
                return;
            }
            if(number && number?.length !== 10){
                toast.error("enter a valid phonenumber")
                setLoading(false);
                return;
            }
            const data = await requestForOtp("91."+ number);
            if(data.status == true)
            {
                setAuthData(data)
                setLoading(false);
                setScreen(2)
            }
            else{
                setLoading(false);
                toast.error(data?.message)
                console.log(data)
            }
           
     }
     catch(err){
        toast.error(err?.message)
        setLoading(false);
        console.log(err)
     }
       
    }


    const handleVerifyRequest = async (otpCode) => {
        try{
               setLoading(true);
               if(!otpCode){
                toast.error("please enter an OTP")
                setLoading(false);
                return;
            }
            if(otpCode && otpCode?.length !== 5){
                toast.error("enter a valid OTP")
                setLoading(false);
                return;
            }
               console.log(phoneNumber, authData?.ginger, otpCode)
               const data = await verifyAnOtp(phoneNumber, authData?.ginger, otpCode);
               console.log(data.token,"token")
               if(!data.token){
                toast.error(data?.message)
                setLoading(false);
                return
               }
               const isTokenSaved = localStorage.setItem("token", data?.token)
               console.log("errr nope")
               if(data.status == true){
                setLoading(false);
                 dispatch(loginUser(data.user))
                 setVisible(false)
                return true
               }
              else
              {
                toast.error("something went wrong")
                setLoading(false);
                return false
              }
            
        }
        catch(err){}
    }

    return (
        <>
        <Wrapper>
            <LoginHeader>
               {screen == 1 ? "Login" : "Verify"} 
            </LoginHeader>
            <LoginHeaderDesc>
            {screen == 1 ? "welcome to finscre" : `enter an OTP sent to +91${phoneNumber}`}
            {/* &emsp; &emsp; resend OTP in {seconds}s   */}
            </LoginHeaderDesc>
          
            {screen == 1 ? <PhoneNumberInput
             onChange={(e)=>{
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setPhoneNumber(e.target.value)
                }
             }}
             value={phoneNumber}
             placeholder="phonenumber"
            /> : <PhoneNumberInput
            onChange={(e)=>{
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setOtp(e.target.value)
                }
             }}
            value={otp}
            placeholder="OTP"
            type="number"
           />}
            {screen == 1 ? 
                (loading ? <SimpleLoader black={true}></SimpleLoader> :
                <SendOtpButton onClick={()=>{onClickSendOtp(phoneNumber)}}>
                  Send OTP
                </SendOtpButton>) :
                (<SendOtpButton onClick={async() => {
                    const res = await handleVerifyRequest(otp);  
                    if(res){
                        window.location.reload();
                    }
                    else{

                    }
                    }}>
                Verify
                </SendOtpButton>)
            }
           
            
        </Wrapper>
        
        </>
    )
}
export default Login;