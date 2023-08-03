import GameCatogaryCard from "../../../components/game-category-cards/GameCatogryCards";
import { CatogaryWrapper } from "./catogary.styles";
import Anim from "../../../assets/gif/dice-animated.gif"
import useWindowDimensions from "../../../hooks/UseWindowDimensions";

const data = [
    {
        title:"TVBET",
        desc:"Live Games 24/7",
        image:Anim
    },
    {
        title:"Casino",
        desc:"Over 3000 games",
        image:Anim
    },
    {
        title:"Live-Games",
        desc:"Live dealers",
        image:Anim
    },
    {
        title:"Poker",
        desc:"Free Tournaments",
        image:Anim
    }
]

const Catogary = () => {

    const {width,height} = useWindowDimensions()
  //  console.log(windowDimensions)

    return (
        <CatogaryWrapper>
            {
                data.map((cat,index)=>{
                    return(
                        <div style={{marginLeft:index !== 0 && width > 768 ? 15 : 0, flexBasis:"21%",marginBottom:width < 768 ? "15px" : "0", marginRight:index === data.length -1 && width > 768 ? "40px" : "30px"}}>
                            <GameCatogaryCard
                                key={index}
                                heading={cat.title}
                                description={cat.desc}
                                image={cat.image}
                             />
                        </div>
                    )
                })
            }
        </CatogaryWrapper>
    )
}

export default Catogary;