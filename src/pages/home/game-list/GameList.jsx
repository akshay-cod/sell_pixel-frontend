import GameListCard from "../../../components/game-list-card/GameListCard"

const GameList = () => {
    return(
        <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
            <div style={{flexBasis:"50%"}}>
                <GameListCard></GameListCard>
            </div>
            <div  style={{flexBasis:"50%"}}>
            <GameListCard></GameListCard>
            </div>
        </div>
    )
}

export default GameList