import Skeleton from "react-loading-skeleton";
import { DetailsWrapper, Heading, IconNameWrapper, IconWrapper, NameDesc, NameHeading, NameWrapper, OverViewWrapper } from "./overview.styles";
import {AiOutlineAntDesign} from 'react-icons/ai'
const OverView = ({loading}) => {
    return (
     <>
      <OverViewWrapper>
         <Heading>
           {loading ? <Skeleton width={150}/> :"Overview of your profile"} 
         </Heading>

   <DetailsWrapper>
      {
        [0,1,2].map((res)=>{
            return(
                <IconNameWrapper>
                <IconWrapper>
                {loading ? <Skeleton width={30} height={30}/> : <AiOutlineAntDesign fontSize={30}/>}
                </IconWrapper>
                 <NameWrapper>
                    <NameHeading>
                      {loading ? <Skeleton  width={150}/> : "81 creations"} 
                    </NameHeading>
                      <NameDesc style={{whiteSpace:"pre-line"}}>
                        {loading ? <Skeleton count={2} height={10}  width={100}/> : "this shows the total creation \n this shows the total creation"}
                      
                      </NameDesc>
                     </NameWrapper>
                  </IconNameWrapper>
            )
        })
      }
   </DetailsWrapper>
         

      </OverViewWrapper>
     </>
    )
}

export default OverView;