
import { colorsV2 } from "../../../../configs/theme/color";
import { AvatarHolder, AvatorContainer, BannerWrapper, BioHeading, BioWrapper, ButtonWrapper, DesName, DescText, HeadingWrapper, ImageAvatar, Name, PremiumIcon, Seperator, TextHeading, TextNameHolder } from "./banner.profile.styles";
import VerifiedIcon from "../../../../assets/icons/verified.svg"
import PreIcon from "../../../../assets/icons/premium.svg"
import OverView from "../overview/OverView";
import { BsInstagram, BsFacebook, BsYoutube, BsDiscord, BsGlobe, BsTwitter} from "react-icons/bs";
import LazyImage from "../../../../components/lazy-image/LazyImage";

const BannerProfile = () => {
    return(<>
    <BannerWrapper>
    <HeadingWrapper>
    <div >
        <div>
     <TextHeading>
              Hello, <b>Akshay Aradhya</b> <br/>
              Good Morning!!
     </TextHeading> 
     <ButtonWrapper>
          <AvatorContainer>
           
                <AvatarHolder>
                    <LazyImage
                    style={{borderRadius:"10px",
                        height:"64px",
                        width:"64px"}}
                    height={64}
                    width={64}
                    src="https://source.unsplash.com/user/c_v_r/100x100"/>
                    {/* <ImageAvatar /> */}
                </AvatarHolder>
                <TextNameHolder>
                    <Name>DanielaSpector <img src={VerifiedIcon} style={{transform:"translate(2px,3px)"}} /></Name> 
                    <DesName>Photography in New York </DesName>
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
            Bio
        </BioHeading>
        <DescText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit placerat vel velit amet id. Nisl, eget in potenti erat a faucibus aliquet tristique ac. Eu sapien mauris sed arcu sodales. Enim varius et sit elit pretium, sit nulla mollis. Pellentesque vel pulvinar feugiat mauris
        </DescText>
        <BioHeading style={{marginTop:20}}>
        </BioHeading>
        <DescText>
        { true ? <BsGlobe  style={{marginRight:8, color:"#858584"}}/> : ""}  
               {true ? <BsInstagram  style={{marginRight:8, color:"#858584"}}/> : ""}
               {true ? <BsFacebook  style={{marginRight:8, color:"#858584"}}/>: ""}
                {true ? <BsDiscord  style={{marginRight:8, color:"#858584"}}/> : ""}
                {true ? <BsYoutube  style={{marginRight:8, color:"#858584"}}/>: ""}
                {true ? <BsTwitter  style={{marginRight:8, color:"#858584"}}/>: ""}
        </DescText>
    </BioWrapper>
    <Seperator/>
    <OverView/>
    <Seperator/>
    <BioWrapper>
        <BioHeading>
         <PremiumIcon src={PreIcon}/>   Creations
        </BioHeading>
    </BioWrapper>
   
  </>
    )
}

export default BannerProfile;