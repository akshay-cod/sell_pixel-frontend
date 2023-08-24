import { DetailsWrapper, Heading, IconNameWrapper, IconWrapper, NameDesc, NameHeading, NameWrapper, OverViewWrapper } from "./overview.styles";
import {AiOutlineAntDesign} from 'react-icons/ai'
const OverView = () => {
    return (
     <>
      <OverViewWrapper>
         <Heading>
            Overview of your profile
         </Heading>

   <DetailsWrapper>
      {
        [0,1,2].map((res)=>{
            return(
                <IconNameWrapper>
                <IconWrapper>
                 <AiOutlineAntDesign fontSize={30}/>
                </IconWrapper>
                 <NameWrapper>
                    <NameHeading>
                       81 creations
                    </NameHeading>
                      <NameDesc>
                        this shows the total creation<br/>
                         from your profile
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