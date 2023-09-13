import { useEffect } from "react";

import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn, CardLeftWrapper, CardRightWrapper, PriceHolder, StatusImageWrapper, ImageStatus, TextWrap, PurchasedItemTitle, PurchasedItemTime, StatusSuccess, StatusProcessing, StatusFailure } from "./transactions.styles";

import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { listTransactionsOfUser, listTransactionsOfUserPaginated, listWithdrawalsOfUser, listWithdrawalsOfUserPaginated } from "../../../api/withdraw/withdraw-request";
import { LiaSuperpowers } from "react-icons/lia";
import { MdWorkspacePremium } from "react-icons/md";
import { priceFormat } from "../../../helpers/formatting";
import {BiMoney, BiTransferAlt} from "react-icons/bi"
import { capitalizeFirstLetter } from "../../../helpers/common";
const TransactionsUi = ({margin}) => {
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
        const res = await listTransactionsOfUserPaginated(page);
        if(res.transactions.length != 10){
            setHasMore(false)
        }
        setPurchases([...purchases ,...res.transactions])
    }

    const fetchUserPurchses = async () => {
        setLoading(true)
        const res = await listTransactionsOfUser();
        if(res.transactions.length != 10){
            setHasMore(false)
        }
        setPurchases(res.transactions)
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
                                    
                                         <PurchasedItemTitle style={{fontSize:17}}>{item?.created_by?.first_name ? capitalizeFirstLetter(item?.created_by?.first_name) : "not-found"} </PurchasedItemTitle>
                                     
                                        <PurchasedItemTime>
                                         Contact: {item?.created_by?.phone_number} <br/>
                                        {moment(item?.createdAt).format('lll')}
                                        </PurchasedItemTime>
                                        {item?.transaction_history[0] && <PurchasedItemTime style={{marginTop:2}}>
                                            {item?.transaction_history[0].error_Message}
                                        </PurchasedItemTime>}
                                     </TextWrap>
                                  </StatusImageWrapper>
                             </CardLeftWrapper>
                             <CardRightWrapper>
                                    <PriceHolder style={{textAlign:"center"}}>
                                        {priceFormat(item?.price)}
                                    </PriceHolder>
                                    {item.status == "initaited" ?  
                                        <StatusProcessing>
                                            initiated
                                        </StatusProcessing>
                                        :
                                        item.status == "success" ?
                                        <StatusSuccess>
                                        success
                                      </StatusSuccess>
                                        :
                                        <StatusFailure>
                                             failure
                                        </StatusFailure>}
                                      
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

export default TransactionsUi;