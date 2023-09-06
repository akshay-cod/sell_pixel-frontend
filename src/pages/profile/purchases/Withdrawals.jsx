import { useEffect } from "react";
import { getAnUserPurchases, getAnUserPurchasesPaginated } from "../../../api/auth/auth-request";
import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn, CardLeftWrapper, CardRightWrapper, PriceHolder, StatusImageWrapper, ImageStatus, TextWrap, PurchasedItemTitle, PurchasedItemTime, StatusSuccess, StatusProcessing } from "./withdrawals.styles";

import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { listWithdrawalsOfUser, listWithdrawalsOfUserPaginated } from "../../../api/withdraw/withdraw-request";
import { LiaSuperpowers } from "react-icons/lia";
import { MdWorkspacePremium } from "react-icons/md";
import { priceFormat } from "../../../helpers/formatting";
import {BiMoney, BiTransferAlt} from "react-icons/bi"
const Withdrawals = ({margin}) => {
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
        const res = await listWithdrawalsOfUserPaginated(page);
        if(res.withdrawals.length != 10){
            setHasMore(false)
        }
        setPurchases([...purchases ,...res.withdrawals])
    }

    const fetchUserPurchses = async () => {
        setLoading(true)
        const res = await listWithdrawalsOfUser();
        if(res.withdrawals.length != 10){
            setHasMore(false)
        }
        setPurchases(res.withdrawals)
        setLoading(false)
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
                no withdrawals yet
            </div> : ""
           }
            {!loading &&
                purchases.length > 0 && purchases.map((item,index)=>{
                    return(
                        <CardWrapper>
                             <CardLeftWrapper>
                             <StatusImageWrapper>
                                     <ImageStatus>
                                         <BiMoney fontSize={35}/> 
                                      
                                      
                                     </ImageStatus>
                                     <TextWrap>
                                    
                                         <PurchasedItemTitle style={{fontSize:17}}>{ `Withdrawal of ₹${item?.amount.toLocaleString()}`}</PurchasedItemTitle>
                                     
                                        <PurchasedItemTime>
                                        {moment(item?.createdAt).format('LLL')}
                                        </PurchasedItemTime>
                                        {item?.bank_ref && <PurchasedItemTime>
                                            <BiTransferAlt style={{transform:"translate(0px,4px)"}} fontSize={18}/> {item?.bank_ref}
                                        </PurchasedItemTime>}
                                     </TextWrap>
                                  </StatusImageWrapper>
                             </CardLeftWrapper>
                             <CardRightWrapper>
                                    <PriceHolder style={{textAlign:"center"}}>
                                        {priceFormat(item?.amount)}
                                    </PriceHolder>
                                    {item.is_processed ?  
                                        <StatusSuccess>
                                            success
                                        </StatusSuccess>
                                        :
                                        <StatusProcessing>
                                             processing
                                        </StatusProcessing>}
                            </CardRightWrapper>
                        {/* <TitlePriceWrapper>
                           
                            <TitleContainer>{ `Withdrawal of ₹${item?.amount.toLocaleString()}`}</TitleContainer>
                          
                            
                            <PriceContainer>₹{item?.amount.toLocaleString()}</PriceContainer>
                         </TitlePriceWrapper>     
                         <CreatorPurchaseTimeWrapper>
                                <TimeWrapper>
                                    {moment(item?.createdAt).format('LLL')}
                                </TimeWrapper>
                         </CreatorPurchaseTimeWrapper>  
                         <ButtonWrapper>
                            <PreviwBtn style={{border: !item.is_processed ? "1px solid red" : ""}}>
                               {item.is_processed ? "success" : "processing"}  
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

export default Withdrawals;