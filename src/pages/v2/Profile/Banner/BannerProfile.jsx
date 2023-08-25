
import { colorsV2 } from "../../../../configs/theme/color";
import { AvatarHolder, AvatorContainer, BannerWrapper, BioHeading, BioWrapper, ButtonWrapper, DesName, DescText, HeadingWrapper, ImageAvatar, Name, PremiumIcon, Seperator, TextHeading, TextNameHolder } from "./banner.profile.styles";
import VerifiedIcon from "../../../../assets/icons/verified.svg"
import PreIcon from "../../../../assets/icons/premium.svg"
import OverView from "../overview/OverView";
import { BsInstagram, BsFacebook, BsYoutube, BsDiscord, BsGlobe, BsTwitter} from "react-icons/bs";
import LazyImage from "../../../../components/lazy-image/LazyImage";
import { getDynamicFileUrl } from "../../../../helpers/get-dynamic-file-url";
import { useState } from "react";
import { ensureHttps } from "../../../../helpers/validations";
import { HiOutlineShare } from "react-icons/hi"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Modal from "../../../../components/common/modal/Modal";
import ShareCompo from "../../../home/profile/share/ShareCompo";

const BannerProfile = ({creator,loading}) => {
    //loading = true
    const [shareModal, setShareModal] = useState(false);

    const openLinkInNewTab = (url) => {
        window.open( 
            ensureHttps(url), "_blank");
    }

    return(<>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">   
    <BannerWrapper link={creator?.banner_image || ""}>
    
    <HeadingWrapper>
    <div >
        <div>
     <TextHeading>
        { loading ? <><Skeleton width={350}/><Skeleton width={250}/></> :
             <> Hello, <b>{creator?.first_name ? (creator?.first_name +" "+ creator?.last_name ): creator?.user_name }</b> <br/>
              Good Morning!!</>}
     </TextHeading> 
     <ButtonWrapper>
          <AvatorContainer>
           
                <AvatarHolder>
                    {loading ? <><Skeleton width={64} height={64}/></> :
                    <LazyImage
                    style={{borderRadius:"10px",
                        height:"64px",
                        width:"64px",
                    objectFit:"contain",
                    background:"rgb(26, 26, 26)"
                }}
                    height={64}
                    width={64}
                    src={creator?.profile_picture ? creator?.profile_picture : getDynamicFileUrl("avatar.svg")}/>}
                    {/* <ImageAvatar /> */}
                </AvatarHolder>
                <TextNameHolder>
                    <Name> {loading ? <><Skeleton width={150} height={12}/> </>:  creator?.first_name ? (creator?.first_name +" "+ creator?.last_name ): creator?.user_name }
                    {loading ? "" : <img src={VerifiedIcon} style={{transform:"translate(2px,3px)"}} />} 
                   
                     </Name> 
                    <DesName>{loading ? <Skeleton width={250} height={18}/> : "Trusted creator from FinsCRE"}  {(creator?.is_owner && creator?.is_verified_user && !loading) ? <HiOutlineShare onClick={()=>{setShareModal(true)}} style={{marginLeft:5,cursor:"pointer", transform:"translate(0px,3px)"}} fontSize={18} /> : ""}</DesName>
                </TextNameHolder>
            </AvatorContainer>
        
     </ButtonWrapper>
     </div>
     <div>

     </div>
     </div>
  </HeadingWrapper>
  
    </BannerWrapper>
    <BioWrapper>
        <BioHeading>
           {loading ? <Skeleton width={30}/> : "Bio"} 
        </BioHeading>
        <DescText>
         {loading ? (<><Skeleton height={12} width="70%" /><Skeleton height={12} width="50%" /><Skeleton height={12} width="90%" /><Skeleton height={12} width="60%" /></>) :  creator?.bio || "Hey, im trusted creator on finscre"}
        </DescText>
        <BioHeading style={{marginTop:20}}>
        </BioHeading>
        <DescText>
            {
                loading ? <div style={{display:"flex"}}>{[0,1,2,3,3].map(()=>{
                    return(<Skeleton width={16} circle={true} style={{marginRight:5}}/>)
                })}</div> : <>
                { creator?.links?.website ? <BsGlobe onClick={()=>{openLinkInNewTab(creator?.links?.website)}}  style={{marginRight:8, color:"#858584", cursor:"pointer"}}/> : ""}  
               {creator?.links?.instagram  ? <BsInstagram onClick={()=>{openLinkInNewTab(creator?.links?.instagram)}}  style={{marginRight:8, color:"#858584", cursor:"pointer"}}/> : ""}
               {creator?.links?.facebook  ? <BsFacebook onClick={()=>{openLinkInNewTab(creator?.links?.facebook)}}  style={{marginRight:8, color:"#858584", cursor:"pointer"}}/>: ""}
                {creator?.links?.discord  ? <BsDiscord onClick={()=>{openLinkInNewTab(creator?.links?.discord)}}  style={{marginRight:8, color:"#858584", cursor:"pointer"}}/> : ""}
                {creator?.links?.youtube ? <BsYoutube onClick={()=>{openLinkInNewTab(creator?.links?.youtube)}} style={{marginRight:8, color:"#858584", cursor:"pointer"}}/>: ""}
                {creator?.links?.twitter ? <BsTwitter onClick={()=>{openLinkInNewTab(creator?.links?.twitter)}} style={{marginRight:8, color:"#858584", cursor:"pointer"}}/>: ""}
                </>
            }
              
        </DescText>
    </BioWrapper>
    <Seperator/>
    <OverView loading={loading}/>
    <Seperator/>
    <BioWrapper>
        <BioHeading>
         <PremiumIcon src={PreIcon}/>  {loading ? <Skeleton width={80}/> : "Creations"} 
        </BioHeading>
    </BioWrapper>
    </SkeletonTheme>
    <Modal
          auth={true}
          isVisible={shareModal}
          setVisible={setShareModal}
          component={<ShareCompo text={`Obtain exclusive content and personalized mentorship by acquiring my premium profile. ${window.location.origin}/${creator?.user_name}?isMultiplePayable=true`}/>}
        />
  </>
    )
}

export default BannerProfile;