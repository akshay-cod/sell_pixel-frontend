import { Carosal } from "../../../components";
import { CarosalItems } from "../CarosalItems";
import { BannerButton, BannerOne, BannerSingleWrapper, BannerText, BannerThree, BannerTwo, InlineBannerWrapper } from "./inlineBanners.styles";
import BannerImageTwo from "../../../assets/casinoimage.png"
import BannerImageOne from "../../../assets/bannerone.png"

const InlineBanners = () => {
    return(
        <InlineBannerWrapper>
            <BannerOne>
                <Carosal componentArray={CarosalItems}/>
            </BannerOne>
            <BannerTwo>
                <BannerSingleWrapper url={BannerImageTwo}>
                    <BannerText>
                        Cash Upto 30% <br/>
                        On Casino 
                    </BannerText>
                    <BannerButton>
                        Go to casino
                    </BannerButton>
                </BannerSingleWrapper>
            </BannerTwo>
            <BannerThree>
            <BannerSingleWrapper url={BannerImageTwo}>
                    <BannerText>
                        Cash Upto 30% <br/>
                         On Casino 
                    </BannerText>
                    <BannerButton>
                        Go to casino
                    </BannerButton>
                </BannerSingleWrapper>
            </BannerThree>
        </InlineBannerWrapper>
    )
}

export default InlineBanners;