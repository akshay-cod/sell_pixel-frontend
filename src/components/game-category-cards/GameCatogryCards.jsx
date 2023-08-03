import { CardWrapper, DescText, HeadingText, IconImage, LeftWrapper, RightWrapper } from "./game.catogery.styles";

const GameCatogaryCard = ({heading, description, image}) => {
    return(
        <CardWrapper>
                <LeftWrapper>
                    <HeadingText>
                        {heading}
                    </HeadingText>
                    <DescText>
                        {description}
                    </DescText>
                </LeftWrapper>
                <RightWrapper>
                    <IconImage src={image}/>
                </RightWrapper>
        </CardWrapper>
    )
}

export default GameCatogaryCard;