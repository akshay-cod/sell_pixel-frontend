import styled from "styled-components";
import { colors } from "../../../configs/theme/color";

export const Wrapper = styled.div`
 padding 40px 40px
`

export const LoginHeader = styled.div`
font-size:22px;
color:${colors.primary};
font-weight:bold;
padding:0px 0px;
text-align:left;
`

export const LoginHeaderDesc = styled.div`
font-size:12px;
color:${colors.primary};
padding-top:5px;
padding-bottom:15px;
text-align:left;
`

export const PhoneNumberInput = styled.input.attrs({
    type:"text"
})`
  background:#edf0f7;
  width:92%;
  border:none;
  outline:none;
  border-radius:10px;
  font-size:20px;
  padding:15px;
  text-align:center;
`

export const SendOtpButton = styled.div`
background: linear-gradient(90.77deg,#A259FF .96%,#A259FF 99.87%);
box-shadow: 0 6px 18px rgba(17,120,223,.3);
text-shadow: 0 4px 8px rgba(0,0,0,.1);
border-radius: 10px;
margin-top:15px;
margin-bottom:10px;
text-align:center;
padding:12px;
color:white;
font-size:20px;
cursor:pointer;
`