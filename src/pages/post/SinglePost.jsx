import { useCallback, useEffect, useState } from "react";
import Layout from "../../HOC/Layout";
import BannerWithImage from "../home/profile/BannerWithImage";
import { AvatarSmall, Createdby, DescHeading, Descr, SinglePostWrapper, Space, TimeStamp, TitleHeading } from "./singlepost.styles";
import { getAPostDetails } from "../../api/posts/posts-requests";
import Modal from "../../components/common/modal/Modal";
import { GreenBtn, Name, ProfileImage, PurchaseWrapper } from "../home/home.styles";
import { user } from "../../store/feature/auth";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostContainer } from "../home/post/post.styles";
import ReactPlayer from 'react-player';
import moment from "moment/moment";
import { useScript } from "../../hooks/UseScript";
import { PAYMENT_URL, __ENV } from "../../configs/urls/urls";
import axiosInstance from "../../axios/AxiosInstance";
import ImageViewer from 'react-simple-image-viewer';
import PdfViewer from "../../components/pdf-viewer/PdfViewer";
import { getDynamicFileUrl } from "../../helpers/get-dynamic-file-url";

const downloadURI = (uri, name) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const SinglePost = ({setLoginVisible}) => {
  const [images, setImages] = useState([])
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const navigate = useNavigate();

  const openImageViewer = useCallback((index,image) => {
    setImages([image])
    setCurrentImage(0);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

    const [post, setPost] = useState({});
    const userDetails = useSelector(user)
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const UserRedux = useSelector(user);

    //pdf
    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    const onPdfClick = (url) => {
      setPdfUrl(url)
    // navigate("/view/pdf", {state:{url:url}})
      setIsPdfOpen(true)
    } 
    const onPdfClose = () => {
      setIsPdfOpen(false)
    }
   
  const { EasebuzzCheckout } = useScript("https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js",  "EasebuzzCheckout")
    
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
            // console.log(response,"res")
            if(response.status === "success"){
              // let verify = await axiosInstance.post(PAYMENT_URL+"/verify_payment",
              // {
              //   response:response,
              //   price:post?.price || 10,
              //   product:params?.id,
              //   type:"creations"
              // }
              // )
             // console.log(verify)
             navigate("/payment/success")
            //  await fetchPostDetails()
              setPurchaseLoading(false)
              document.body.style.overflow = "scroll"
            }
            else{
              navigate("/payment/failure")
              setPurchaseLoading(false)
            }
              
             // document.getElementById('response').innerText=JSON.stringify(response);
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
    },[])

    useEffect(()=>{
        if(post?.is_purchased){
          setStatus("purchased");
          setVisible(false)
        }
        else{
          setStatus("not-purchased");
          setVisible(true)
          setLoading(true)
        }
      },[post])
    

    const fetchPostDetails = async() => {
        try{
            setLoading(true)
            const res = await getAPostDetails(params?.id);
            let creations = res.creation
            //creations.is_purchased = false;
           // creations.is_profile_purchased = true;
            setPost(creations)
            setLoading(false)
        }
        catch(err){setLoading(false)}
      
    }

    return(
        <>
         <BannerWithImage image={post?.banner_img} banner={true} height={500}/>
            <SinglePostWrapper>
                <TitleHeading>
                       {post?.title}
                </TitleHeading>
                <TimeStamp>
                Minted on {moment(post?.createdAt).format('lll')}
                </TimeStamp>

                <DescHeading>
                        Created By
                </DescHeading>
                <Createdby>
                  <AvatarSmall src={post?.created_by?.profile_picture ? post?.created_by?.profile_picture : getDynamicFileUrl("avatar.svg")}/>   {post?.created_by?.first_name ? post?.created_by?.first_name : post?.created_by?.user_name}
                </Createdby>
                <DescHeading>
                    Description
                </DescHeading>
                <Descr>
               {
                post?.description
               }</Descr>

            </SinglePostWrapper>
            <Space/>
            {
            !loading && post?.files?.length == 0 ?
            <div style={{textAlign:"center"}}>
                no files yet
            </div> : ""
           }
            <PostContainer>
           
                {
                    post?.files?.length > 0 &&
                    post?.files.map((file,index)=>{
                        if(file.type.startsWith('image'))
                        return(
                            <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5}}>
                            <img  onClick={() => openImageViewer(index,file.url)} style={{objectFit:"contain", cursor:"pointer"}} src={file.url} width="300" height="200"/>
                       
                        </div>
                        )
                        if(file.type.startsWith('video'))
                        return(
                            <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5}}>
                  
                                <div style={{background:"black"}}>
                                        <ReactPlayer
                                        width="100%"
                                        height="198px"
                                        controls
                                        config={{ file: { 
                                            attributes: {
                                              controlsList: 'nodownload'  //<- this is the important bit
                                            }
                                        }}}
                                        url={file?.url}/> 
                                </div>
                            </div>)
                        if(file.type.startsWith('application/pdf'))
                        return(
                            <div onClick={()=>{onPdfClick(file.url)}} style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",cursor:"pointer"}}>
                                <img src={getDynamicFileUrl("icons/pdf.png")} width="150" height="150"/>
                                <div style={{marginTop:10}}> {file.url.split('/')[3]} </div> 
                            </div>
                        )
                        else
                        return(
                            <div onClick={()=>{downloadURI(file.url)}} style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5,display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center", cursor:"pointer"}}>
                                <img src={getDynamicFileUrl("icons/file.png")} width="150" height="150"/>
                              <div style={{marginTop:10}}> {file.url.split('/')[3]}
                                </div> 
                            </div>
                        )
                    })
                }
                {/* <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5}}>
                   {
                    post?.files?.length > 0 ? 
                    <div style={{background:"black"}}>
                    <ReactPlayer
                    width="100%"
                    height="198px"
                    controls
                    url={post?.files[0]?.url}/> 
                    </div>
                    : ""
                   } 
                    
                     </div> */}
                    
            </PostContainer>
          {post?.is_purchased == false &&  <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper style={{paddingLeft:20}}>
             <ProfileImage src={post?.created_by?.profile_picture}>

             </ProfileImage>
             <Name>
             {post?.created_by?.first_name }
             </Name>
             <GreenBtn onClick={()=>{
             OnPurchase()
             }}>
                Purchase ₹{post?.price.toLocaleString()}
              </GreenBtn> 
          </PurchaseWrapper>
           
        } auth={false}/> }
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
        <div style={{position:"absolute",top:0,zIndex:102, background:"black", width:"100%",display:"flex",justifyContent:"center",overflow:"scroll"}}>
          <div onClick={()=>{setIsPdfOpen(false)}} style={{position:"fixed",zIndex:200,right:20,top:10,cursor:"pointer"}}>
            X
          </div>
            <div >
            <PdfViewer url={pdfUrl}/>
            </div>
           
        </div>
        
      }
            </>
    )
}

export default SinglePost;