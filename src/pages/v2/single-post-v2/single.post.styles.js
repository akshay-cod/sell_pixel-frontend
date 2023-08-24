import styled from "styled-components";
import { typography } from "../../../configs/theme/typography";
import { colorsV2 } from "../../../configs/theme/color";

export const FilesWrapper = styled.div`
margin-top:20px;
margin-bottom:0px;
display:flex;
margin-right:7%;
margin-left:7%;
`

export const SingleFileWrapper = styled.div`
background:${colorsV2.block.medium};
border-radius:10px;
`

export const FileImage = styled.img`
 width:40px;
 margin-bottom:30px;
`

export const FileName =styled.div`
font-size:${typography.title.fs.fontSize}px;
font-family:GraphikSemiBold;
`

export const FileDateTime = styled.div`
margin: 6px 0px;
font-size:${typography.sub.fxs.fontSize}px;
color:${colorsV2.text.placeholder}
`

export const FileSizeWrapper = styled.div`
padding:15px;
background:${colorsV2.block.light};
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.light};
border-bottom-left-radius:10px;
border-bottom-right-radius:10px;
font-family:GraphikSemiBold;
`

export const AbsoluteImageHolder = styled.div`
display:flex;
justify-content:flex-end;
padding-right:60px;
align-items:center;
`

export const AbsluteImage = styled.img`
border:1px solid #e58a3d82;
width:100px;
height:60px;
object-fit:cover;
border-radius:10px;
margin-left:6px;
`

export const FileDetailsWrapper = styled.div`
position: sticky;
align-self: flex-start;
top:80px;
flex-basis:30%;
min-height:80vh;
width:100%;
background:${colorsV2.block.medium};
padding:15px;
margin-left:25px;
border-radius:10px;
`

export const PreviewImageContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
`

export const ImageWrapper = styled.img`
object-fit:cover;
width:100px;
margin-top:30px;
`

export const PreviewIconHolder = styled.div`
display:flex;
justify-content:flex-end;
margin-right:20px;
`

export const ImageIcons = styled.div`
background:${colorsV2.block.light};
border-radius:10px;
padding:8px;
margin-right:10px;
margin-top:40px;
cursor:pointer;
`

export const TitleFilePreview = styled.div`
font-size:${typography.title.fs.fontSize}px;
color:${colorsV2.text.light};
margin-bottom:5px;
`

export const DescFilePreview = styled.div`
font-size:${typography.sub.fxs.fontSize}px;
color:${colorsV2.text.placeholder};
`

export const TagWrapper = styled.div`
display:flex;
margin-top:30px;
margin-bottom:30px;
font-size:${typography.sub.fs.fontSize}px;
`

export const Tag = styled.div`
background:${colorsV2.block.light};
padding:6px 15px;
border-radius:5px;
`

export const PreviewDescHolder = styled.div``

export const DescTitle = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.light};
margin-bottom:8px;
`

export const Desctext = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.placeholder};
line-height:${typography.body.fs.lineHeight};
`

export const InfoHolder = styled.div`
margin-top:30px;
`

export const InfoText = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.light};
margin-bottom:15px;
`

export const RowColowmnHolder = styled.div`
display:flex;
justify-content:space-between;
`

export const RowOne = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.placeholder};`

export const RowTwo = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.light};`

export const BannerHolder = styled.div`
width:100%;
height:300px;
background:  linear-gradient(90deg, rgb(26, 26, 26) 0%, rgba(27,47,51,0.7) 100%), url(${props => props.link}) no-repeat center;
background-blend-mode: normal  ;
background-size: 100% ;
object-fit:cover;
position:relative;
padding-bottom:20px;
margin-bottom:20px;
border-radius:10px;
min-height:300px;
`

export const BannerImage = styled.img`
height:300px;
width:100%;
object-fit:cover;
border-radius:10px;
opacity: 0.8;
`

export const MainTitleWrapper = styled.div`
padding:40px;`

export const MainTitle = styled.div`
margin-top:30px;
margin-bottom:5px;
font-size:${typography.title.f3xl.fontSize}px;
font-family:GraphikSemiBold;
color:${colorsV2.text.light};
`

export const MainDesc = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.placeholder};`