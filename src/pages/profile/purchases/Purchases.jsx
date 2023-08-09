import { useEffect } from "react";
import { getAnUserPurchases, getAnUserPurchasesPaginated } from "../../../api/auth/auth-request";
import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn } from "./purchases.styles";

import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";

const Purchases = ({heading}) => {
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
        const res = await getAnUserPurchasesPaginated(page);
        if(res.purchases.length != 10){
            setHasMore(false)
        }
        setPurchases([...purchases ,...res.purchases])
    }

    const fetchUserPurchses = async () => {
        const res = await getAnUserPurchases();
        if(res.purchases.length != 10){
            setHasMore(false)
        }
        setPurchases(res.purchases)

    }

    const navigateToProfile = (id) => {
        navigate(`/${id}`)
    }

    const onLoadMore = () => {
        setPage(page+1)
      }

    return(
        <PurchasesWrapper>
           
            {
                purchases.length > 0 && purchases.map((item,index)=>{
                    return(
                        <CardWrapper>
                        <TitlePriceWrapper>
                            <TitleContainer>{ `Profile of ${item?.profile?.first_name || item?.profile?.user_name}`}</TitleContainer>
                            <PriceContainer>₹{item?.price.toLocaleString()}</PriceContainer>
                         </TitlePriceWrapper>     
                         <CreatorPurchaseTimeWrapper>
                                <CreatorName onClick={()=>navigateToProfile(item?.profile?._id)}>
                                {item?.profile ? `${item?.profile?.first_name || item?.profile?.user_name}`: ""}
                                </CreatorName>
                                <TimeWrapper>
                                    {moment(item?.createdAt).format('LLL')}
                                </TimeWrapper>
                         </CreatorPurchaseTimeWrapper>  
                         <ButtonWrapper>
                            <PreviwBtn onClick={()=>navigateToProfile(item?.profile?._id)}>
                                View
                            </PreviwBtn>
                         </ButtonWrapper>
                    </CardWrapper>
                    )
                })
            }
            {
          haseMore ? 
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