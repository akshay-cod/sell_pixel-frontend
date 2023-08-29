import { useEffect } from "react";
import { getAnUserPurchases, getAnUserPurchasesPaginated } from "../../../api/auth/auth-request";
import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn, StatusImageWrapper, TextWrap, CardLeftWrapper, CardRightWrapper, ImageStatus, PurchasedItemTitle, PurchasedItemTime, PriceHolder } from "./purchases.styles";
import {MdWorkspacePremium} from "react-icons/md";
import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { priceFormat } from "../../../helpers/formatting";
import {LiaSuperpowers} from 'react-icons/lia'
const Purchases = ({margin}) => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState(0);
    const [haseMore, setHasMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        fetchUserPurchses();
    },[])

    useEffect(()=>{
        if(page > 0){
          fetchmoreDetails(page)
        }
    },[page])

    const fetchmoreDetails = async () => {
        setLoadMoreLoading(true)
        const res = await getAnUserPurchasesPaginated(page);
        if(res.purchases.length != 10){
            setHasMore(false)
        }
        setPurchases([...purchases ,...res.purchases])
        setLoadMoreLoading(false)
    }

    const fetchUserPurchses = async () => {
        setLoading(true)
        const res = await getAnUserPurchases();
        if(res.purchases.length != 10){
            setHasMore(false)
        }
        setPurchases(res.purchases)
        setLoading(false)
    }

    const navigateToProfile = (id) => {
        window.open( 
            `/${id}`, "_blank"); 
    }

    const onLoadMore = () => {
        setPage(page+1)
      }

      if(loading){
        return(
            <PurchasesWrapper margin={margin}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">  
            <Skeleton  height={80} width={"100%"} borderRadius={10}/>
            <Skeleton  height={80} width={"100%"} borderRadius={10} style={{margin:"15px 0px"}}/>
            <Skeleton  height={80} width={"100%"} borderRadius={10}/>
            </SkeletonTheme>
            </PurchasesWrapper>
        )
      }
    return(
        <PurchasesWrapper margin={margin}>
           {
            !loading && purchases.length == 0 ?
            <div style={{textAlign:"center"}}>
                no purchases yet
            </div> : ""
           }
            {!loading &&
                purchases.length > 0 && purchases.map((item,index)=>{
                    return(
                        <CardWrapper onClick={()=>{
                            if(item.product){
                                navigateToProfile(`creations/${item?.product?._id}`)
                            }
                            else{
                                navigateToProfile(item?.profile?._id)
                            }
                            }}>
                            <CardLeftWrapper>
                                  <StatusImageWrapper>
                                     <ImageStatus>
                                        {
                                            item.product ? <LiaSuperpowers fontSize={25}/> :  <MdWorkspacePremium fontSize={25}/>
                                        }
                                      
                                     </ImageStatus>
                                     <TextWrap>
                                     {
                                           item.product ?  <PurchasedItemTitle>{ `${item?.product?.title}`}</PurchasedItemTitle>
                                             : <PurchasedItemTitle>{ `Profile of ${item?.profile?.first_name || item?.profile?.user_name}`}</PurchasedItemTitle>
                                     }
                                        <PurchasedItemTime>
                                        {moment(item?.createdAt).format('LLL')}
                                        </PurchasedItemTime>
                                     </TextWrap>
                                  </StatusImageWrapper>
                            </CardLeftWrapper>
                            <CardRightWrapper>
                                    <PriceHolder>
                                        {priceFormat(item?.price)}
                                    </PriceHolder>
                            </CardRightWrapper>
                        {/* <TitlePriceWrapper>
                            {
                                item.product ?  <TitleContainer>{ `${item?.product?.title}`}</TitleContainer>
                                : <TitleContainer>{ `Profile of ${item?.profile?.first_name || item?.profile?.user_name}`}</TitleContainer>
                            }
                            
                            <PriceContainer>₹{item?.price.toLocaleString()}</PriceContainer>
                         </TitlePriceWrapper>     
                         <CreatorPurchaseTimeWrapper>
                                {
                                    item.product ? <CreatorName onClick={()=>navigateToProfile(item?.owner?._id)}>
                                    {item?.owner ? `${item?.owner?.first_name || item?.owner?.user_name}`: ""}
                                    </CreatorName>
                                    :
                                    <CreatorName onClick={()=>navigateToProfile(item?.profile?._id)}>
                                    {item?.profile ? `${item?.profile?.first_name || item?.profile?.user_name}`: ""}
                                    </CreatorName>
                                }
                                <TimeWrapper>
                                    {moment(item?.createdAt).format('LLL')}
                                </TimeWrapper>
                         </CreatorPurchaseTimeWrapper>   */}
                         {/* <ButtonWrapper>
                            <PreviwBtn onClick={()=>{
                                if(item.product){
                                    navigateToProfile(`creations/${item?.product?._id}`)
                                }
                                else{
                                    navigateToProfile(item?.profile?._id)
                                }
                                }}
                                
                                >
                               {item.product ? "view creation" : "View User"}  
                            </PreviwBtn>
                         </ButtonWrapper> */}
                    </CardWrapper>
                    )
                })
            }
            {
         !loading && haseMore ? 
          <LoadMoreWrapper>
           {
              loadMoreLoading ? <SimpleLoader></SimpleLoader> :
              <LoadMoreBtn onClick={onLoadMore}>
            loadmore
          </LoadMoreBtn>
           } 
          </LoadMoreWrapper>
           : ""
        } 
        </PurchasesWrapper>
    )
}

export default Purchases;