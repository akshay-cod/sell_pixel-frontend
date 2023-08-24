import styled from "styled-components";
import { typography } from "../../../../configs/theme/typography";
import { colorsV2 } from "../../../../configs/theme/color";

export const BannerWrapper = styled.div`
width:100%;
height:290px;
background-color: fade(#FFFFFF, 100%);
background: url("https://images.unsplash.com/photo-1475710534222-6165a8b45449?ixlib=rb-0.3.5&s=b4b0451caff94a9c0150b34ecc44d98d&auto=format&fit=crop&w=1350&q=80") no-repeat center, linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5));
background-blend-mode: overlay;
background-size: 100% ;
object-fit:cover;
position:relative;
padding-bottom:20px;
border-bottom:1px solid ${colorsV2.divider.dark};
`

export const TextHeading = styled.div`
font-size:${typography.title.fl.fontSize}px;
line-height:35px;
padding-bottom:20px;
`

export const HeadingWrapper =styled.div`
display:flex;
flex-direction:column;
justify-content:flex-end;
height:100%;
padding-left:8%;

`

export const ButtonWrapper = styled.div``

export const AvatorContainer = styled.div`
display:flex;
align-items:center;
`

export const AvatarHolder = styled.div`
margin-right:10px;
`

export const ImageAvatar = styled.img`
border-radius:10px;
height:64px;
width:64px;
`

export const TextNameHolder = styled.div``

export const Name = styled.div`
font-size:${typography.sub.fl.fontSize}px;
color:${colorsV2.text.placeholder};
margin-bottom:3px;
`

export const DesName = styled.div`
color:${colorsV2.text.light};
font-size:${typography.title.fm.fontSize}px;
`

export const BioWrapper = styled.div`
margin-top:25px;
margin-bottom:25px;
padding-left:7.2%;
@media only screen and (max-width: 600px){
    padding-right:7.2%;
}
`

export const BioHeading = styled.div`
font-size:${typography.title.fxs.fontSize}px;
font-weight:${typography.title.fl.fontWeight};
margin-bottom:10px;
@media only screen and (max-width: 600px){
	font-size:${typography.sub.fs.fontSize}px;
    text-align:center;
    font-size:18px;
}
`

export const DescText = styled.div`
font-size:${typography.body.fl.fontSize};
max-width:70%;
color:${colorsV2.text.placeholder};
@media only screen and (max-width: 600px){
	font-size:${typography.sub.fs.fontSize}px;
    max-width:100%;
    padding-right:20px;
}
`

export const Seperator = styled.div`
background:${colorsV2.divider.dark};
width:100%;
height:.6px;
`

export const PremiumIcon = styled.img`
width:18px;
transform:translate(-2px, 2.5px);
`