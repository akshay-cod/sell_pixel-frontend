import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BannerImage, BannerImageWrapper, BannerWrapper, BioDescr, BioHeading, IconsWrapper, LinkHeading, Nametext, ProfileImage, TextWrapper } from "./banner.styles";
import { BsInstagram, BsFacebook, BsYoutube, BsDiscord, BsGlobe, BsTwitter} from "react-icons/bs";

import {HiOutlineShare} from "react-icons/hi"
import { useState } from "react";
import Modal from "../../../components/common/modal/Modal";
import ShareCompo from "./share/ShareCompo";
import { getDynamicFileUrl } from "../../../helpers/get-dynamic-file-url";
import { ensureHttps } from "../../../helpers/validations";

const BannerWithImage = ({banner,height,creator,loading, image}) => {
   
    const [shareModal, setShareModal] = useState(false);

    const openLinkInNewTab = (url) => {
        window.open( 
            ensureHttps(url), "_blank");
    }

    if(banner){
        return(
            <BannerWrapper>
            <BannerImageWrapper>
            <BannerImage src= {image ? image : "https://picsum.photos/1000/800"} height={height}/>
          
            </BannerImageWrapper></BannerWrapper>
        )
    }
    return(
        <>
        <BannerWrapper>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">   
                   
                  
            <BannerImageWrapper>
            {loading ? <Skeleton  height={300} width={"100%"} />  : <BannerImage src= {image ? image: "https://picsum.photos/1000/800"}/>}
            {loading ? <Skeleton  height={120} width={100} 
                style={{
                    position:"absolute",
                    zIndex:10,
                    bottom:"-50px",
                    left:"80px"
                }}
            />  : <ProfileImage src={creator?.profile_picture ? creator?.profile_picture : getDynamicFileUrl("avatar.svg")}/> }
            </BannerImageWrapper>
            
           <TextWrapper>
            <Nametext>
              {
                loading ? <Skeleton width={200}/> : creator?.first_name || creator?.phone_number
              }  { loading ? <Skeleton width={200}/> : (creator?.is_owner && creator?.is_verified_user) ? <HiOutlineShare onClick={()=>{setShareModal(true)}} style={{marginLeft:5,cursor:"pointer", transform:"translate(0px,3px)"}} fontSize={18} /> : ""}
            </Nametext>
            <BioHeading>
           {
              loading ? <Skeleton width={50}/> :"Bio"
           } 
           </BioHeading>
           <BioDescr>
            {
                loading ?
                <>
                 <Skeleton width={300}/> 
                 <Skeleton width={250}/> 
                 <Skeleton width={200}/> 
                 <Skeleton width={300}/> 
                </>
               : creator?.bio || "no bio"
            }
           
           </BioDescr>
           <LinkHeading>
           {loading ?  <Skeleton width={50}/> : "Links"}
           </LinkHeading>
           <IconsWrapper>
            {
                loading ? <div style={{display:"flex"}}>
                <Skeleton circle width={20} height={20} style={{marginRight:4}}/>
                <Skeleton circle width={20} height={20} style={{marginRight:4}}/>
                <Skeleton circle width={20} height={20} style={{marginRight:4}}/>
                <Skeleton circle width={20} height={20}/>
                </div>
                :
                <>
               { creator?.links?.website ? <BsGlobe onClick={() => openLinkInNewTab(creator?.links?.website)} style={{marginRight:8, color:"#858584"}}/> : ""}  
               {creator?.links?.instagram ? <BsInstagram onClick={() => openLinkInNewTab(creator?.links?.instagram)} style={{marginRight:8, color:"#858584"}}/> : ""}
               {creator?.links?.facebook ? <BsFacebook onClick={() => openLinkInNewTab(creator?.links?.facebook)} style={{marginRight:8, color:"#858584"}}/>: ""}
                {creator?.links?.discord ? <BsDiscord onClick={() => openLinkInNewTab(creator?.links?.discord)} style={{marginRight:8, color:"#858584"}}/> : ""}
                {creator?.links?.youtube ? <BsYoutube onClick={() => openLinkInNewTab(creator?.links?.youtube)} style={{marginRight:8, color:"#858584"}}/>: ""}
                {creator?.links?.twitter ? <BsTwitter onClick={() => openLinkInNewTab(creator?.links?.twitter)} style={{marginRight:8, color:"#858584"}}/>: ""}
              
                </>
            }
               
           </IconsWrapper>
           </TextWrapper>
           </SkeletonTheme>
        </BannerWrapper>
        <Modal
          auth={true}
          isVisible={shareModal}
          setVisible={setShareModal}
          component={<ShareCompo text={`Obtain exclusive content and personalized mentorship by acquiring my premium profile. ${window.location.origin}/${creator?.user_name}?isMultiplePayable=true`}/>}
        />
        </>
    )
}

export default BannerWithImage;