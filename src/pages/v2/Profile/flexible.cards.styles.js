import styled from "styled-components";
import { colorsV2 } from "../../../configs/theme/color";
import { typography } from "../../../configs/theme/typography";

export const CardWrapper = styled.div`
 background:${colorsV2.block.medium};
 padding:15px;
 border-radius:15px;
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
