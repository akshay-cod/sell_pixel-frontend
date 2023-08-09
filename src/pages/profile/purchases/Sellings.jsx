import { useEffect } from "react";
import { getAnUserPurchases, getAnUserPurchasesPaginated, getAnUserSellings, getAnUserSellingsPaginated } from "../../../api/auth/auth-request";
import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn, CommissionHolder } from "./sellings.styles";

import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";

const Sellings = () => {
    const [sellings, setSellings] = useState([]);
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
        const res = await getAnUserSellingsPaginated(page);
        if(res.sellings.length != 10){
            setHasMore(false)
        }
        setSellings([...sellings ,...res.sellings])
    }

    const fetchUserPurchses = async () => {
        const res = await getAnUserSellings();
        if(res.sellings.length != 10){
            setHasMore(false)
        }
        setSellings(res.sellings)

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
                sellings.length > 0 && sellings.map((item,index)=>{
                    return(
                        <CardWrapper>
                        <TitlePriceWrapper>
                            <TitleContainer>{ `Profile purchased by ${item?.purchased_user?.first_name || item?.purchased_user?.user_name}`}</TitleContainer>
                            <PriceContainer>₹{item?.price.toLocaleString()}</PriceContainer>
                         </TitlePriceWrapper>     
                         <CreatorPurchaseTimeWrapper>
                                <CreatorName onClick={()=>navigateToProfile(item?.purchased_user?._id)}>
                                {`${item?.purchased_user?.first_name || item?.purchased_user?.user_name}`}
                                </CreatorName>
                                <TimeWrapper>
                                    {moment(item?.createdAt).format('LLL')}
                                </TimeWrapper>
                         </CreatorPurchaseTimeWrapper>  
                         <CommissionHolder>
                            <div>
                            platform-cut : ₹{item?.commisson?.commission_share.toLocaleString()}
                            </div>
                            <div>
                            user-earnings : ₹{item?.commisson?.user_wallet_share.toLocaleString()}
                            </div>
                           
                         </CommissionHolder>
                         <ButtonWrapper>
                            <PreviwBtn onClick={()=>navigateToProfile(item?.purchased_user?._id)}>
                                View User
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

export default Sellings;