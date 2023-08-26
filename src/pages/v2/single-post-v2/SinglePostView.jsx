import {WrapperNonSticky, AbsluteImage,StackHolder, AbsoluteImageHolder, BannerHolder, BannerImage, DescFilePreview, DescTitle, Desctext, FileDateTime, FileDetailsWrapper, FileImage, FileName, FileSizeWrapper, FilesWrapper, ImageIcons, ImageWrapper, InfoHolder, InfoText, MainDesc, MainTitle, MainTitleWrapper, PreviewDescHolder, PreviewIconHolder, PreviewImageContainer, RowColowmnHolder, RowOne, RowTwo, SingleFileWrapper, Tag, TagWrapper, TitleFilePreview, VideWrapper, FullScreenPlayerWrapper } from "./single.post.styles";
import StackGrid from "react-stack-grid";
import PdfIcon from "../../../assets/icons/PDF.svg";
import {PiDownloadFill} from "react-icons/pi";
import {AiFillInfoCircle} from "react-icons/ai"
import { PremiumIcon } from "../Profile/Banner/banner.profile.styles";
import PreIcon from "../../../assets/icons/premium.svg"
import DOCIcon from "../../../assets/icons/DOC.svg"
import HTMLIcon from "../../../assets/icons/HTML.svg"
import ZIPIcon from "../../../assets/icons/ZIP.svg"
import CSVIcon from "../../../assets/icons/CSV.svg"
import MP3Icon from "../../../assets/icons/MP3.svg";
import SVGIcon from "../../../assets/icons/SVG.svg";
import XSLIcon from "../../../assets/icons/XSL.svg"
import UNKNOWNIcon from "../../../assets/icons/UNKNOWN.svg"
import {PiArrowSquareLeftFill, PiArrowSquareRightFill} from "react-icons/pi";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai"
import { useState } from "react";
import {isMobile} from "react-device-detect";
import { downloadURI, formatBytes, generateVideoThumbnail } from "../../../helpers/common";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { user } from "../../../store/feature/auth";
import { useScript } from "../../../hooks/UseScript";
import axiosInstance from "../../../axios/AxiosInstance";
import { PAYMENT_URL, __ENV } from "../../../configs/urls/urls";
import { useEffect } from "react";
import { getAcreationNoAuth } from "../../../api/creations/creations-requests";
import { getAPostDetails } from "../../../api/posts/posts-requests";
import moment from "moment";
import ReactPlayer from "react-player";
import LazyImage from "../../../components/lazy-image/LazyImage";
import ImageViewer from 'react-simple-image-viewer';
import { useCallback } from "react";
import PdfViewer from "../../../components/pdf-viewer/PdfViewer";
import {BsPlayCircle} from "react-icons/bs";
import { GreenBtn, Name, ProfileImage, PurchaseWrapper } from "../Profile/flexible.cards.styles";
import Modal from "../../../components/common/modal/Modal";
import VideoPlayer from "../../../players/VideoPlayer";

const SinglePostView = ({setLoginVisible}) => {
  const imgurl = "https://source.unsplash.com/user/c_v_r/1000x100"
  //const [currentImage, setCurrentImage] = useState(imgurl+1)
  const { EasebuzzCheckout } = useScript("https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js",  "EasebuzzCheckout")

  const params = useParams();
  const navigate = useNavigate();
  const UserRedux = useSelector(user);

  const [post, setPost] = useState({});
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [singleFile, setSingleFile] = useState({})
  const [images, setImages] = useState([])
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const [isVideoModal, setIsVideoModal] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")

  const [loading, setLoading] = useState(true);  
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  
  const OnPurchase = async () => {
    try{
      if(UserRedux.auth == false){
        setLoginVisible(true)
        return
      }
      if(purchaseLoading){
        return;
      }
      else{
        setPurchaseLoading(true)
      }
        let res = await axiosInstance.post(PAYMENT_URL+"/initiate_payment",
        {
          product:params?.id,
          price:post?.price || 10,
          type:"creations"
        })
        var easebuzzCheckout = new EasebuzzCheckout(res.data.key, (__ENV == "prod" ? "prod" : "test"))
        var options = {
        access_key: res.data.access_key, // access key received via Initiate Payment
        onResponse: async (response) => {
          if(response.status === "success"){
           navigate("/status/payment/success",{state:{link:"/creations/"+params.id, type:"success", name:post?.created_by?.first_name + post?.created_by?.last_name + " "+ "creations"}})
         
            setPurchaseLoading(false)
            document.body.style.overflow = "scroll"
          }
          else{
            navigate("/status/payment/failure", {state:{link:"/creations/"+params.id, type:"failure"}})
            setPurchaseLoading(false)
          }
         },
        theme: "#2B2B2B" // color hex
        }
        easebuzzCheckout.initiatePayment(options);
        setPurchaseLoading(false)
    }
    catch(err){
      setPurchaseLoading(false)
    }
}

useEffect(()=>{
  fetchPostDetails()
},[UserRedux])



useEffect(()=>{
  if(post?.is_purchased){
    setStatus("purchased");
    setVisible(false)
  }
  else{
    setStatus("not-purchased");
    setVisible(true)
   // setLoading(true)
  }
},[post])


const fetchPostDetails = async() => {
  try{
    if(UserRedux.auth == false && UserRedux.loading == false){
      setLoading(true)
      const res = await getAcreationNoAuth(params?.id);
      let creations = res.creation
      setPost(creations)
      setLoading(false)
    }
    else{
      setLoading(true)
      const res = await getAPostDetails(params?.id);
      let creations = res.creation
      if(creations?.files){
        setSingleFile(creations.files[0])
      }
     
      setPost(creations)
      setLoading(false)
    }
      
  }
  catch(err){setLoading(false)}

}

  const onPdfClick = (url) => {
    setPdfUrl(url)
    setIsPdfOpen(true)
  } 

  const handleRightArrow = () => {
        setCurrentImage(imgurl+2)
  }
  
  const handleLeftArrow = () => {
    setCurrentImage(imgurl+3)
}

const openImageViewer = useCallback((index,image) => {
  setImages([image])
  setCurrentImage(0);
  setIsViewerOpen(true);
}, []);

const closeImageViewer = () => {
  setCurrentImage(0);
  setIsViewerOpen(false);
};

const onClickVideoPlay = (url) => {
  setVideoUrl(url)
  setIsVideoModal(true)
}

const onClickVideoPlayClose = (url) => {
  setVideoUrl("")
  setIsVideoModal(false)
}


    return(
  <>
    <FilesWrapper>
      <WrapperNonSticky >
        <BannerHolder link={post?.banner_img}>
          
          <MainTitleWrapper>
          <TagWrapper style={{margin:0}}>
          <Tag><PremiumIcon style={{width:14}} src={PreIcon}/> Content </Tag>
          <div style={{fontSize:10,marginBottom:2,transform:"translate(10px,10px)"}}> Minted on {moment(post?.createdAt).format('lll')}</div>
          </TagWrapper>
          <MainTitle>
          {post?.title}
          </MainTitle>
         
          <MainDesc>
          {
                post?.description
          }   
          </MainDesc>
          </MainTitleWrapper>
         
         <AbsoluteImageHolder>
          <AiFillCaretLeft onClick={handleLeftArrow} fontSize={"14px"} style={{cursor:"pointer",background:"white", transform:"translate(0px,0px)",padding:2,border:"1px solid rgba(229, 138, 61)", borderRadius:"50%"}} color="rgba(229, 138, 61)"/>
            <AbsluteImage src={post?.banner_img}/>
            
          <AiFillCaretRight onClick={handleRightArrow} fontSize={"14px"} style={{cursor:"pointer",background:"white", transform:"translate(6px,0px)",padding:2,border:"1px solid rgba(229, 138, 61)", borderRadius:"50%"}} color="rgba(229, 138, 61)"/>
         </AbsoluteImageHolder>
           
        </BannerHolder>
        <StackHolder>
          {
          
                <StackGrid columnWidth={isMobile ? "100%" : 200} monitorImagesLoaded={true}  gutterHeight={15} gutterWidth={15}>
                {
                  post?.files?.length > 0 &&
                  post?.files.map((file,index)=>{
                    return(
                     <SingleFileWrapper style={{minHeight:"auto"}}>
                       <div style={{padding:15, position:"relative"}}>
                        {
                          file.type.startsWith('video') ? 
                          <div style={{background:"black",marginBottom:30}}>
                          <ReactPlayer
                      
                         playing={false}
                          width="100%"
                          height={isMobile ? "220px" : "120px"}
                          config={{ file: { 
                              attributes: {
                                controlsList: 'nodownload'  //<- this is the important bit
                              }
                          }}}
                          url={file?.url}/> 
                          <div onClick={()=>{onClickVideoPlay(file.url)}} style={{position:"absolute",top:isMobile ? "35%":"25%",left:isMobile ? "43%" :"40%",cursor:"pointer"}}>
                            <BsPlayCircle color="white" fontSize={40}/>
                            </div>
                      </div>
                          : (!file.type.startsWith("image") && !file.type.startsWith("video")) ?
                           <FileImage
                           onClick={()=>{if(file.type == "application/pdf")onPdfClick(file.url)}}
                           src={file.type == "application/pdf" ?
                            PdfIcon : file.type.startsWith("audio") 
                            ? MP3Icon : file.type.startsWith("text/csv") 
                            ? CSVIcon : file.type.startsWith("application/x-zip-compressed") ?
                             ZIPIcon : file.type.startsWith("text/html") ?
                             HTMLIcon : file.type.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ?
                             XSLIcon: UNKNOWNIcon}/> 
                          : file.type.startsWith("image") ? 
                          file.type.startsWith("image/svg+xml") ?
                          <FileImage src={SVGIcon}/> 
                          :
                          <LazyImage
                          onClick={() => openImageViewer(index,file.url)}
                          src={file?.url}
                          width="100%"
                          height={200}
                          style={
                           {background:"rgb(26, 26, 26)",borderRadius:10, width:"100%",height:200,objectFit:"contain",marginBottom:20}
                          }
                          />
                          : "null"
                        }
                      
                       <FileName style={{cursor:"pointer"}} onClick={()=>{setSingleFile(file)}}>{file?.url?.split('/')[3]}</FileName>
                       <FileDateTime>{moment(post.createdAt).format("lll")}</FileDateTime>
                       </div>
                       
                       <FileSizeWrapper>
                            {formatBytes(file.size)}
                            {(isMobile && !file?.type?.startsWith("video")) ?
                   <PiDownloadFill style={{transform:"translate(0px, 0px)",paddingBottom:"5px", float:"right"}} onClick={()=>{
                      if(!file?.type?.startsWith("video"))
                      downloadURI(file?.url)
                      }} fontSize={21}/>
                      : ""
                 }
                       </FileSizeWrapper>
                </SingleFileWrapper>
                   )
                 })
                }
          </StackGrid>
              
          }
        
         </StackHolder>
         </WrapperNonSticky>
            <FileDetailsWrapper>
              { singleFile?.url ?
                <><PreviewImageContainer>
                  {
                    singleFile?.type?.startsWith('video') ?  
                    (
                      // <div style={{ height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5}}>
            
                      //     <div style={{background:"black"}}>
                      //             <ReactPlayer
                      //             width="100%"
                      //             height="198px"
                      //             controls
                      //             config={{ file: { 
                      //                 attributes: {
                      //                   controlsList: 'nodownload'  //<- this is the important bit
                      //                 }
                      //             }}}
                      //             url={singleFile?.url}/> 
                      //     </div>
                      // </div>
                      <VideoPlayer url={singleFile.url}/>
                      ) :
                      singleFile?.type?.startsWith("image/svg+xml") ?
                      (<ImageWrapper src={SVGIcon}/>) :
                      singleFile?.type?.startsWith("image") ?
                      (<LazyImage
                        onClick={() => openImageViewer("",singleFile.url)}
                        src={singleFile?.url}
                        width="100%"
                        height={200}
                        style={
                         {cursor:"pointer",background:"rgb(26, 26, 26)",borderRadius:10, width:"100%",height:200,objectFit:"contain",marginBottom:20}
                        }
                        />)
                      :
                  <ImageWrapper
                   src={ singleFile?.type == "application/pdf" ?
                            PdfIcon : singleFile?.type?.startsWith("audio") 
                            ? MP3Icon : singleFile?.type?.startsWith("text/csv") 
                            ? CSVIcon : singleFile?.type?.startsWith("application/x-zip-compressed") ?
                             ZIPIcon : singleFile?.type?.startsWith("text/html") ?
                             HTMLIcon : singleFile?.type?.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ?
                             XSLIcon: UNKNOWNIcon}/> }
              </PreviewImageContainer>
              <PreviewIconHolder>
              {!singleFile?.type?.startsWith("video") &&  <ImageIcons>
                   <PiDownloadFill onClick={()=>{
                      if(!singleFile?.type?.startsWith("video"))
                      downloadURI(singleFile?.url)
                      }} fontSize={21}/>
                  </ImageIcons>}
                  <ImageIcons >
                    <AiFillInfoCircle fontSize={21}/>
                  </ImageIcons>
              </PreviewIconHolder>
              <div style={{padding:15,marginTop:20}}>
               <TitleFilePreview>
               {singleFile?.url?.split('/')[3]}
              </TitleFilePreview>
              <DescFilePreview>
                { singleFile?.type}  ({formatBytes(singleFile.size)})
              </DescFilePreview>

              <TagWrapper>
                <Tag>{singleFile?.type?.split("/")[1]}</Tag>
              </TagWrapper>

              <PreviewDescHolder>
                <DescTitle>
                  Description
                </DescTitle>
                <Desctext>
                  {
                    singleFile.desc || "file description not added"
                  }
                </Desctext>
              </PreviewDescHolder>
              <InfoHolder>
                <InfoText>
                  Info
                </InfoText>
                <RowColowmnHolder>
                  <RowOne>
                     {/* <div style={{marginBottom:10}}>Size</div> */}
                     <div>Date</div>
                  </RowOne>
                  <RowTwo>
                     {/* <div style={{marginBottom:10}}>1233 x 1233</div> */}
                     <div>{moment(post.createdAt).format("lll")}</div>
                  </RowTwo>
                </RowColowmnHolder>
              </InfoHolder>
              </div>
              </>
              : ""
            }
            </FileDetailsWrapper>
                
    </FilesWrapper>

    {isViewerOpen && (
        <ImageViewer
          
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex:100
          }}
          closeOnClickOutside={true}
        />
      )} 
        {isPdfOpen &&
        <div style={{position:"absolute",top:0,zIndex:102, background:"black", width:"100%",display:"flex",justifyContent:"center",minHeight:"100vh"}}>
          <div onClick={()=>{setIsPdfOpen(false)}} style={{position:"fixed",zIndex:200,right:20,top:10,cursor:"pointer"}}>
            X
          </div>
            <div >
            <PdfViewer url={pdfUrl}/>
            </div>
           
        </div>
        
      }
      
      {isVideoModal &&
        <FullScreenPlayerWrapper>
          <VideWrapper>
          <div onClick={()=>{onClickVideoPlayClose()}} style={{position:"fixed",fontFamily:"GraphikSemiBold", zIndex:200,right:20,top:10,cursor:"pointer",
          
         
          }}>
            X
          </div>
         {/* <ReactPlayer        
         playing={false}
          width={isMobile ? 280 : 800}
          height={isMobile ? 158 : 450}
          style={{maxHeight:500,minHeight:200}}
          controls
          config={{ file: { 
              attributes: {
                controlsList: 'nodownload'  //<- this is the important bit
              }
          }}}
          url={videoUrl}/>  */}
          <VideoPlayer url={videoUrl}/>
          </VideWrapper>
          </FullScreenPlayerWrapper>
      }

{post?.is_purchased == false &&  <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper style={{paddingLeft:20}}>
             <ProfileImage src={post?.created_by?.profile_picture}>

             </ProfileImage>
             <Name style={{textAlign:"center"}}>
            content from {post?.created_by?.first_name || post?.created_by?.user_name}
             </Name>
             <div style={{color:"black",marginBottom:2,fontWeight:500, overflow: "hidden",
        textOverflow: "ellipsis",whiteSpace: "nowrap",width:300,textAlign:"center"}}> {post?.title}
             </div>
             <div style={{color:"black",marginBottom:10,fontWeight:400,whiteSpace:"pre-line",
            display: "-webkit-box",
            "-webkit-line-clamp": 3,
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
            textAlign:"center"
            }}>
              {post?.description}
             </div>
             <GreenBtn onClick={()=>{
             OnPurchase()
             }}>
                Purchase ₹{post?.price.toLocaleString()}
              </GreenBtn> 
          </PurchaseWrapper>
           
        } auth={false}/> }
     
  </>
    )
}

export default SinglePostView;