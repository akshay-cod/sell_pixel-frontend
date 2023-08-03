import BannerImage from "../../assets/bannerone.png"
import BannerImageTwo from "../../assets/bannertwo.png"

const BannerOne = (image) => { return (
    <div style={{
       // height:"400px",
        
    }}>
        <img src={image}
         style={{
            objectFit:"fill",
            position:"relative",
            // borderRadius:"10px",
             height:"320px",
            // borderRadius:"10px"
         }}
        />
        <div style={{
            position:"absolute",
            top:0
        }}>
            <div>
                button
            </div>
        </div>
    </div>
)}

export const CarosalItems = [
    {
        component:BannerOne(BannerImage)
    },
    {
        component:BannerOne(BannerImageTwo)
    },
    {
        component:BannerOne(BannerImage)
    },
]