import styled from "styled-components";
import { colors } from "../../configs/theme/color";
import { borders } from "../../configs/theme/borders";

export const CardWrapper = styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 background:linear-gradient(110deg,#1e283f,rgba(20,27,46,.6) 100%);
 border-radius:${borders.primary};
 min-width:100%;
 padding:5px 20px;
 @media only screen and (max-width: 768px){
    min-width:100%;
 }
 `

export const LeftWrapper = styled.div`
`

export const HeadingText = styled.div`
 font-size:26px;
 color:white;
 margin-bottom:1px;
`
export const DescText = styled.div`
font-size:13px;
color:white;
`

export const RightWrapper = styled.div`
`

export const IconImage = styled.img`
height:65px;
transform:translate(0px,8px);
`