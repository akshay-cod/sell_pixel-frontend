import styled from "styled-components";
import { colorsV2 } from "../../../../configs/theme/color";
import { typography } from "../../../../configs/theme/typography";
import img from "../../../../assets/g3.png"

export const OverViewWrapper = styled.div`
padding:20px;
margin-left:7%;
margin-right:7%;
background-image: url(${img});
background-position: center;
background-size: cover;
margin-top:20px;
margin-bottom:20px;
border-radius:10px;
`

export const Heading = styled.div`
font-size:${typography.title.fs.fontSize}px;
font-family:GraphikSemiBold;
padding:5px 0px;
margin-bottom:10px;
text-align:center;
`

export const DetailsWrapper = styled.div`
display:flex;
justify-content:center;
@media only screen and (max-width: 600px){
	flex-direction:column;
    justify-content:center;
    align-items:center;
}
`

export const IconNameWrapper = styled.div`
display:flex;
padding-right:80px; 
align-items:center;
 margin-top:20px; 
 margin-bottom:20px;
 @media only screen and (max-width: 600px){
	padding-right:0px;
}
@media only screen and (max-width: 840px){
	padding-right:0px;
}
 `

export const IconWrapper = styled.div`
margin-right:14px;
background:${colorsV2.block.dark};
padding:16px;
border-radius:10px;

`

export const NameWrapper = styled.div``

export const NameHeading = styled.div`
font-size:${typography.title.fs.fontSize}px;
margin-bottom:4px;
`

export const NameDesc = styled.div`
color:${colorsV2.text.medium};
font-size:${typography.body.fm.fontSize}px;
`