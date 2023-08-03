import styled from "styled-components";
import { colors } from "../../../configs/theme/color";
import { padding } from "../../../configs/theme/padding";
import { borders } from "../../../configs/theme/borders";

export const InlineBannerWrapper = styled.div`
 display:flex;
 background:${colors.primary};
 padding:${padding.tertiary}
`;

export const BannerOne = styled.div`
 flex-basis:62%;
 margin-right:20px;
`

export const BannerTwo = styled.div`
 flex-basis:18%;
 margin-right:20px;
`

export const BannerSingleWrapper = styled.div`
height:320px;
background-image:url(${props => props.url});
background-size: cover;
border-radius:20px;
width:100%;
display:flex;
flex-direction: column;
justify-content: space-between;
    align-items: center;
    text-align: center;
`

export const BannerText = styled.div`
width: 100%;
font-size: 30px;
line-height: 106%;
white-space: pre-line;
font-weight:bold;
padding:15px;
color:white;
`

export const BannerButton = styled.div`
margin-bottom:10px;
padding:10px 25%;
border-radius:10px;
background:white;
font-weight:bold;
`

export const BannerThree = styled.div`
flex-basis:18%;
`