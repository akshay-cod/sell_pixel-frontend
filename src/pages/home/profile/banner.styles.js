import styled from "styled-components";
import { colors } from "../../../configs/theme/color";

export const BannerWrapper = styled.div`

 margin-bottom:80px;
`

export const BannerImageWrapper = styled.div`
position:relative;`

export const BannerImage = styled.img`
 width:100%;
 height:${({height}) => height ? height : "300px"};
 object-fit:cover;
`

export const ProfileImage = styled.img`
 width:100px;
 height:120px;
 border-radius:10px;
 object-fit:cover;
 stroke:1px solid #A259FF;
 position:absolute;
 z-index:10;
 bottom:-50px;
 left:80px;
`

export const TextWrapper = styled.div`
padding-top:70px;
padding-left:80px;
`
export const Nametext = styled.div`
font-size:22px;
font-weight:bold;
`

export const BioHeading = styled.div`
 color:#858584;
 margin-top:20px;
 font-size:14px;
`

export const BioDescr = styled.div`
margin-top:4px;
font-size:12px;
font-weight:200;
white-space: pre;
`;

export const LinkHeading = styled.div`
color:#858584;
margin-top:20px;
font-size:14px;
margin-bottom:5px;
`

export const IconsWrapper = styled.div`

`