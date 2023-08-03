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

const SinglePost = ({setLoginVisible}) => {

    const [post, setPost] = useState({});
    const userDetails = useSelector(user)
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true);
    const params = useParams();
    useEffect(()=>{
        fetchPostDetails()
    },[])

    useEffect(()=>{
        if(post?.is_profile_purchased){
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
            const res = await getAPostDetails(params?.id);
            let creations = res.creation
            creations.is_purchasable_profile = true;
            creations.is_profile_purchased = false;
            setPost(creations)
        }
        catch(err){}
      
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
                  <AvatarSmall src={post?.created_by?.profile_picture}/>   {post?.created_by?.first_name}
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
            <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper>
             <ProfileImage src={post?.created_by?.profile_picture}>

             </ProfileImage>
             <Name>
             {post?.created_by?.first_name }
             </Name>
             <GreenBtn onClick={()=>{
                if(!userDetails.auth )
                {
                    setLoginVisible(true)
                    return;
                }
              setPost({...post, is_profile_purchased:true})
              setLoading(false)
             }}>
                Purchase
              </GreenBtn> 
          </PurchaseWrapper>
           
        } auth={false}/> 
            </>
    )
}

export default SinglePost;