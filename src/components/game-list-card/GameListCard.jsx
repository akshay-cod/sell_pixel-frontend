import { GameListCardWrapper, GameListHeading, GameListInnerCardWrapper, SingleGameCardImage, Wrapper } from "./gamelist.card.styles";
import BannerImageOne from "../../assets/bannerone.png"

const GameListCard = () => {
    return(
        <Wrapper>
        <GameListCardWrapper>
            <GameListHeading>
                WIN CHAMP GAMES
            </GameListHeading>
            <GameListInnerCardWrapper>
                {
                    [0,1,2,3].map(()=>{
                        return(
                            <SingleGameCardImage src={BannerImageOne}/>
                        )
                    })
                }
                
            </GameListInnerCardWrapper>
        </GameListCardWrapper>
        </Wrapper>
    )
}

export default GameListCard;