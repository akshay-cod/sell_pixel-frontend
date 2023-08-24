import {WrapperNonSticky, AbsluteImage,StackHolder, AbsoluteImageHolder, BannerHolder, BannerImage, DescFilePreview, DescTitle, Desctext, FileDateTime, FileDetailsWrapper, FileImage, FileName, FileSizeWrapper, FilesWrapper, ImageIcons, ImageWrapper, InfoHolder, InfoText, MainDesc, MainTitle, MainTitleWrapper, PreviewDescHolder, PreviewIconHolder, PreviewImageContainer, RowColowmnHolder, RowOne, RowTwo, SingleFileWrapper, Tag, TagWrapper, TitleFilePreview } from "./single.post.styles";
import StackGrid from "react-stack-grid";
import PdfIcon from "../../../assets/icons/PDF.svg";
import {PiDownloadFill} from "react-icons/pi";
import {AiFillInfoCircle} from "react-icons/ai"
import { PremiumIcon } from "../Profile/Banner/banner.profile.styles";
import PreIcon from "../../../assets/icons/premium.svg"
import DOCIcon from "../../../assets/icons/DOC.svg"
import HTMLIcon from "../../../assets/icons/HTML.svg"
import ZIPIcon from "../../../assets/icons/ZIP.svg"
import MP3Icon from "../../../assets/icons/MP3.svg"
import {PiArrowSquareLeftFill, PiArrowSquareRightFill} from "react-icons/pi";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai"
import { useState } from "react";
import {isMobile} from "react-device-detect";

const SinglePostView = () => {
  const imgurl = "https://source.unsplash.com/user/c_v_r/1000x100"
  const [currentImage, setCurrentImage] = useState(imgurl+1)

  const handleRightArrow = () => {
        setCurrentImage(imgurl+2)
  }

  const handleLeftArrow = () => {
    setCurrentImage(imgurl+3)
}

    return(
  <>
    <FilesWrapper>
      <WrapperNonSticky >
        <BannerHolder link={currentImage}>
          <MainTitleWrapper>
          <TagWrapper style={{margin:0}}>
          <Tag><PremiumIcon style={{width:14}} src={PreIcon}/> Content</Tag>
          
          </TagWrapper>
          <MainTitle>
            Title of the content
            Title of the content
            Title of the content
            Title of the content
          </MainTitle>
          <MainDesc>
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            description of the data
            
          </MainDesc>
          </MainTitleWrapper>
         
         <AbsoluteImageHolder>
          <AiFillCaretLeft onClick={handleLeftArrow} fontSize={"14px"} style={{cursor:"pointer",background:"white", transform:"translate(0px,0px)",padding:2,border:"1px solid rgba(229, 138, 61)", borderRadius:"50%"}} color="rgba(229, 138, 61)"/>
            <AbsluteImage src={"https://source.unsplash.com/user/c_v_r/1000x1000"}/>
            <AbsluteImage src={"https://source.unsplash.com/user/c_v_r/1000x1000"}/>
            <AbsluteImage src={"https://source.unsplash.com/user/c_v_r/1000x1000"}/>
          <AiFillCaretRight onClick={handleRightArrow} fontSize={"14px"} style={{cursor:"pointer",background:"white", transform:"translate(6px,0px)",padding:2,border:"1px solid rgba(229, 138, 61)", borderRadius:"50%"}} color="rgba(229, 138, 61)"/>
         </AbsoluteImageHolder>
            {/* <BannerImage src="https://source.unsplash.com/user/c_v_r/1000x1000"/> */}
        </BannerHolder>
        <StackHolder>
         <StackGrid columnWidth={isMobile ? "100%" : 200} monitorImagesLoaded={true}  gutterHeight={15} gutterWidth={15}>
               {
                [0,12,2,3,32,32,4].map((k,i)=>{
                  return(
                    <SingleFileWrapper style={{minHeight:"auto"}}>
                      <div style={{padding:15}}>
                      <FileImage src={i == 0 ? PdfIcon : i==1 ? MP3Icon : HTMLIcon}/>
                      <FileName>name of the file</FileName>
                      <FileDateTime>12/12/2022, 10:44 am</FileDateTime>
                      </div>
                      
                      <FileSizeWrapper>
                            124.3Mb
                      </FileSizeWrapper>
               </SingleFileWrapper>
                  )
                })
               }
         </StackGrid>
         </StackHolder>
         </WrapperNonSticky>
            <FileDetailsWrapper>
              <PreviewImageContainer>
                   <ImageWrapper src={PdfIcon}/>
              </PreviewImageContainer>
              <PreviewIconHolder>
                  <ImageIcons>
                    <PiDownloadFill fontSize={21}/>
                  </ImageIcons>
                  <ImageIcons >
                    <AiFillInfoCircle fontSize={21}/>
                  </ImageIcons>
              </PreviewIconHolder>
              <div style={{padding:15,marginTop:20}}>
               <TitleFilePreview>
                My first render
              </TitleFilePreview>
              <DescFilePreview>
                PNG-Image
              </DescFilePreview>

              <TagWrapper>
                <Tag>Image</Tag>
              </TagWrapper>

              <PreviewDescHolder>
                <DescTitle>
                  Description
                </DescTitle>
                <Desctext>
                  So this is my first attempt to 3d art
                  and this is how i done 3d stuff in the
                  format of PNG file
                </Desctext>
              </PreviewDescHolder>
              <InfoHolder>
                <InfoText>
                  Info
                </InfoText>
                <RowColowmnHolder>
                  <RowOne>
                     <div style={{marginBottom:10}}>Size</div>
                     <div>Date</div>
                  </RowOne>
                  <RowTwo>
                     <div style={{marginBottom:10}}>1233 x 1233</div>
                     <div>18 sep 2022</div>
                  </RowTwo>
                </RowColowmnHolder>
              </InfoHolder>
              </div>

            </FileDetailsWrapper>
    </FilesWrapper>
  </>
    )
}

export default SinglePostView;