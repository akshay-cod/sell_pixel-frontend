import { useEffect, useState } from "react";
import Layout from "../../HOC/Layout";
import BannerWithImage from "../home/profile/BannerWithImage";
import { AvatarSmall, Createdby, DescHeading, Descr, SinglePostWrapper, Space, TimeStamp, TitleHeading } from "./singlepost.styles";
import { getAPostDetails } from "../../api/posts/posts-requests";
import Modal from "../../components/common/modal/Modal";
import { GreenBtn, Name, ProfileImage, PurchaseWrapper } from "../home/home.styles";
import { user } from "../../store/feature/auth";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostContainer } from "../home/post/post.styles";
import ReactPlayer from 'react-player';
import PdfIcon from "../../assets/icons/pdf.png";
import FileIcon from "../../assets/icons/file.png";
import moment from "moment/moment";
import Avatar from "../../assets/avatar.svg";
import { useScript } from "../../hooks/UseScript";
import { PAYMENT_URL } from "../../configs/urls/urls";
import axiosInstance from "../../axios/AxiosInstance";

const SinglePost = ({setLoginVisible}) => {

    const [post, setPost] = useState({});
    const userDetails = useSelector(user)
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const UserRedux = useSelector(user)
    
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
          var easebuzzCheckout = new EasebuzzCheckout(res.data.key, "test")
          var options = {
          access_key: res.data.access_key, // access key received via Initiate Payment
          onResponse: async (response) => {
             console.log(response,"res")
            if(response.status === "success"){
              let verify = await axiosInstance.post(PAYMENT_URL+"/verify_payment",
              {
                response:response,
                price:post?.price || 10,
                product:params?.id,
                type:"creations"
              }
              )
              console.log(verify)
              await fetchPostDetails()
              setPurchaseLoading(false)
              document.body.style.overflow = "scroll"
            }
            else{
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
                  <AvatarSmall src={post?.created_by?.profile_picture ? post?.created_by?.profile_picture : Avatar}/>   {post?.created_by?.first_name ? post?.created_by?.first_name : post?.created_by?.user_name}
                </Createdby>
                <DescHeading>
                    Description
                </DescHeading>
                <Descr>
               {
                post?.description
               }</Descr>

              {console.log(post.files)}
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
                    post.files.map((file)=>{
                        if(file.type.startsWith('image'))
                        return(
                            <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5}}>
                            <img style={{objectFit:"contain"}} src={file.url} width="300" height="200"/>
                       
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
                            <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <img src={PdfIcon} width="150" height="150"/>
                            </div>
                        )
                        else
                        return(
                            <div style={{width:300, height:200, background:"rgb(43, 43, 43)",padding:10,borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <img src={FileIcon} width="150" height="150"/>
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
                Purchase
              </GreenBtn> 
          </PurchaseWrapper>
           
        } auth={false}/> }
            </>
    )
}

export default SinglePost;