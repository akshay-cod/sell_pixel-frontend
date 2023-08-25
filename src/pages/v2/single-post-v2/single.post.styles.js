import styled from "styled-components";
import { typography } from "../../../configs/theme/typography";
import { colorsV2 } from "../../../configs/theme/color";

export const FilesWrapper = styled.div`
margin-top:20px;
margin-bottom:0px;
display:flex;
margin-right:7%;
margin-left:7%;
@media only screen and (max-width: 600px){
	align-items:center;
    margin-right:1%;
     margin-left:1%;
}
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
@media only screen and (max-width: 840px){
	justify-content:center;
    padding-right:0px;
}
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
@media only screen and (max-width: 600px){
    display:none; 
}
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
export const StackHolder = styled.div`
padding:0px 2%;
@media only screen and (max-width: 400px){
	padding:0px 4%;
}

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
background:  linear-gradient(90deg, rgb(26, 26, 26,0.9) 0%, rgba(27,47,51,0.7) 100%), url(${props => props.link}) no-repeat center;
background-blend-mode: normal  ;
background-size: 100% ;
object-fit:cover;
position:relative;
padding-bottom:20px;
margin-bottom:20px;
border-radius:10px;
min-height:300px;
@media only screen and (max-width: 400px){
	width:100%;
}
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

export const WrapperNonSticky = styled.div`
flex-basis:75%;
@media only screen and (max-width: 1000px){
    flex-basis:65%;
}
@media only screen and (max-width: 600px){
    flex-basis:97%;
}
`

export const MainTitle = styled.div`
margin-top:30px;
margin-bottom:5px;
font-size:${typography.title.f3xl.fontSize}px;
font-family:GraphikSemiBold;
color:${colorsV2.text.light};
width:800px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
@media only screen and (max-width: 1200px){
    width:600px 
}
@media only screen and (max-width: 1000px){
    width:440px 
}
@media only screen and (max-width: 800px){
    width:300px ;
    font-size:24px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;  
    overflow: hidden;
   white-space: pre-line;
}
@media only screen and (max-width: 600px){
    width:auto 
}
`

export const MainDesc = styled.div`
font-size:${typography.sub.fs.fontSize}px;
color:${colorsV2.text.placeholder};
max-width:60%;
display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  @media only screen and (max-width: 800px){
  
    max-width:90%;
}
`

export const FullScreenPlayerWrapper = styled.div`
background:rgba(51, 51, 51,0.7);
 min-height:106vh;
 min-width:106vw;
 position:fixed;
 top:0;
 z-index:999;
`

export const VideWrapper = styled.div`
   background:#222222; 
   width:50%;
   position:absolute;
   top:50%;
   transform:translate(-50%,-50%);
   left:50%;
   z-index:999;
   padding:20px;
   border-radius:10px;
   @media only screen and (max-width: 800px){
  
    width:80%;
}
`