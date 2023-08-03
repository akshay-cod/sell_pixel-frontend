import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
const Carosal = ({componentArray}) => {
    return (
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
         // className="corsosal"
        >
            {
                componentArray?.map((data)=>{
                    return(
                        <div style={{borderRadius:20}}>
                            {data.component}
                        </div>
                    )
                })
            }
        </Carousel>
    )
}

export default Carosal;