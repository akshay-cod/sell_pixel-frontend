import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LazyImage = ({src, height, width, style}) => {

    const [loading, setLoading] = useState(true);

    return(
        <>
         <SkeletonTheme baseColor="#202020" highlightColor="#444">
        { loading ?
       <Skeleton  height={height} width={width} style={{borderRadius:style?.borderRadius}}/>
       : ""}

        <img src={src} style={
            {
                ...style,
                display: loading?"none":"block",
                animation: "fadeIn 0.5s",
            }
        } onLoad={(e)=>{setLoading(false)}}></img>
       </SkeletonTheme>
        </>
    )
}

export default LazyImage;