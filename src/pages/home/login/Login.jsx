import { useEffect, useState } from "react";
import { LoginHeader, LoginHeaderDesc, PhoneNumberInput, SendOtpButton, Wrapper } from "./login.styles";
import { requestForOtp, verifyAnOtp } from "../../../api/auth/auth-request";
import { loginUser, user } from "../../../store/feature/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import {BiArrowBack} from "react-icons/bi"
import Cookies from 'universal-cookie';

const Login = ({setVisible}) => {
    const [screen, setScreen] = useState(1);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [time, setTime] = useState(60);

    const [authData, setAuthData] = useState({});

    const users = useSelector(user);
    const dispatch = useDispatch();
   // console.log(time,"user")

    useEffect(()=>{
        if(screen == 2){
            document.getElementById("otp").focus();
        }
    },[screen])

    useEffect(()=>{
        
        if(screen == 2){
        if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000);
          } else {
            setTime(0);
          }
        }
        return () => clearTimeout()
    })

    const onClickSendOtp = async (number) => {
        try{
            if(loading){
                return
            }
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
                toast.success("successfully sent an otp")
                setScreen(2)
               
            }
            else{
                setLoading(false);
                toast.error(data?.message)
               // console.log(data)
            }
           
     }
     catch(err){
        toast.error(err?.message)
        setLoading(false);
       // console.log(err)
     }
       
    }


    const onResend = async() => {
        setTime(60)
        onClickSendOtp(phoneNumber)
        setOtp("")
    }

    const verifyBtnFb = async() => {
        const res = await handleVerifyRequest(otp);  
        if(res){
            window.location.reload();
        }
        else{

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
              // console.log(phoneNumber, authData?.ginger, otpCode)
               const data = await verifyAnOtp(phoneNumber, authData?.ginger, otpCode);
              // console.log(data.token,"token")
               if(!data.token){
                toast.error(data?.message)
                setLoading(false);
                return
               }
               const cookies = new Cookies();
               const isTokenSaved = cookies.set('token',  data?.token, { path: '/', maxAge:2628000});
              // console.log("errr nope")
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
            <div>
               {screen == 2 ? <BiArrowBack color="black" fontSize="20px"
                 style={{transform:"translate(-30px,-20px)",cursor:"pointer"}}
                 onClick={()=>{setOtp(""); setScreen(1); }}
                /> : ""}
            </div>
            <LoginHeader>
               {screen == 1 ? "Login" : "Verify"} 
            </LoginHeader>
            <LoginHeaderDesc>
            {screen == 1 ? "Welcome to finscre" : `Enter an OTP sent to +91${phoneNumber}`}
            {/* &emsp; &emsp; resend OTP in {time}s   */}
           
            </LoginHeaderDesc>
          
            {screen == 1 ? <PhoneNumberInput
             autoFocus={true}
             onChange={(e)=>{
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setPhoneNumber(e.target.value)
                }
             }}
             value={phoneNumber}
             placeholder="phonenumber"
             onKeyDown={(e)=>{if(e.key === 'Enter'){onClickSendOtp(phoneNumber)}}}
            /> : <PhoneNumberInput
            id="otp"
            autoFocus={true}
            onChange={(e)=>{
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                    setOtp(e.target.value)
                }
             }}
            value={otp}
            placeholder="OTP"
            type="number"
            onKeyDown={(e)=>{if(e.key === 'Enter'){verifyBtnFb()}}}
           />}
              <div style={{color:"black", fontSize:11, marginTop:10, textAlign:"center"}}>
            {(screen == 2) ? <div>{time == 0 ? <span
             style={{color:"blue",cursor:"pointer"}}
            onClick={onResend}
            >Resend</span> :`Resend OTP in ${time}s`}</div> : ""}
            </div>
            {screen == 1 ? 
                (loading ?  <div style={{display:"flex", justifyContent:"center"}}>
                <SimpleLoader black={true}/>
                </div> :
                <SendOtpButton onClick={()=>{onClickSendOtp(phoneNumber)}}>
                  Send OTP
                </SendOtpButton>) :
                (<SendOtpButton onClick={verifyBtnFb}>
                Verify
                </SendOtpButton>)
            }
           
            
        </Wrapper>
        
        </>
    )
}
export default Login;