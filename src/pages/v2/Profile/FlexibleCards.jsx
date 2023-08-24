import StackGrid from "react-stack-grid";
import { AvatarHolder, AvatorContainer, BannerImage, BannerImageWrapper, CardWrapper ,DesName,ImageAvatar, Name, TextNameHolder} from "../Profile/flexible.cards.styles";
import { useEffect } from "react";
import { colorsV2 } from "../../../configs/theme/color";
import BannerProfile from "./Banner/BannerProfile";
import { useNavigate } from "react-router-dom";
const FlexibleCards = () =>{

    const navigate = useNavigate()

    const navigateToCreations = () => {
        navigate("/ui/post")
    }

    useEffect(()=>{
        document.body.style.background = colorsV2.block.dark;
        document.body.style.zoom = '95%';
    })
  return (
    <>
    <div>
        <BannerProfile/>
    </div>
    <div style={{margin:20}}>
    <StackGrid columnWidth={332} gutterWidth={15} gutterHeight={15}>
   {
    [0,6,6,7,8,5,4,3,4,5].map((r,i)=>{
        return(
            <div
      key={i}
     >
        <CardWrapper onClick={navigateToCreations}>
            <AvatorContainer>
                <AvatarHolder>
                    <ImageAvatar src="https://source.unsplash.com/user/c_v_r/100x100"/>
                </AvatarHolder>
                <TextNameHolder>
                    <Name>DanielaSpector</Name>
                    <DesName>Photography in New York </DesName>
                </TextNameHolder>
            </AvatorContainer>
           <BannerImageWrapper>
            <BannerImage src={"https://source.unsplash.com/user/c_v_r/1000x"+(Math.floor(Math.random() * (1200 - 1000)) + 1000)}/>
           </BannerImageWrapper>
           <TextNameHolder>
                    <Name style={{marginBottom:6}}>The Modern Carousel</Name>
                    <DesName>
                        {i == 0 ? "The rough professor precisely kicked because some teacher humbly rolled below a hot hamster which, became a professional, beautiful dog." : ""}
                        {i == 1 || i == 4 ? "For the sentence options you could use an array of strings and have them named op1, op2, etc or something similar. Then in the places where a you want to put a noun, adjective, or whatever you would create a string variable called noun for example and noun would come from another array of strings. So you need an array of strings for your sentence options, an array of strings for each part of speech you want to be randomized, and string variables to use as placeholders in the sentence options." : ""}
                        An investigation into vernacular photography through found film slides. Forgotten images, remembered in a new context. </DesName>
            </TextNameHolder>
            <DesName style={{color:colorsV2.text.medium,marginTop:20}}>#image </DesName>
        </CardWrapper>
    </div>
        )
    })
   } 
  </StackGrid>
  </div>
  </>
  );
}

export default FlexibleCards