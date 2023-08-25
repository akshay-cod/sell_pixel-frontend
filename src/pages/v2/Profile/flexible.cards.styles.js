import styled from "styled-components";
import { colorsV2 } from "../../../configs/theme/color";
import { typography } from "../../../configs/theme/typography";

export const CardWrapper = styled.div`
 background:${colorsV2.block.medium};
 padding:15px;
 border-radius:15px;
 cursor:pointer;
 &:hover {
    transition: background 1s;
    background:${colorsV2.block.light};
`

export const AvatorContainer = styled.div`
display:flex;
align-items:center;
`

export const AvatarHolder = styled.div`
margin-right:10px;
`

export const ImageAvatar = styled.img`
border-radius:50%;
height:48px;
width:48px;
`

export const TextNameHolder = styled.div``

export const Name = styled.div`
font-size:${typography.sub.fs.fontSize}px;
margin-bottom:3px;
`

export const DesName = styled.div`
color:${colorsV2.text.placeholder};
font-size:${typography.sub.fs.fontSize}px;
`
export const BannerImageWrapper = styled.div`
margin-top:15px;
margin-bottom:15px;
`

export const BannerImage = styled.img`
border-radius:9px;
height:200px;
width:100%;
object-fit:cover;
`


export const PurchaseWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding-right:20px;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
`

export const ProfileImage = styled.img`
width: 80px;
border-radius: 50%;
object-fit: contain;
height:80px;
`

export const PurchaseName = styled.div`
font-size:18px;
font-weight:bold;
color:black;
padding:10px;
`

export const GreenBtn = styled.div`
padding:12px 35px;
background:green;
border-radius:10px;
font-weight:bold;
cursor:pointer;
`