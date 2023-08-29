import { useEffect } from "react";
import { getAnUserPurchases, getAnUserPurchasesPaginated, getAnUserSellings, getAnUserSellingsPaginated } from "../../../api/auth/auth-request";
import { PriceContainer, ButtonWrapper, TitleContainer, TitlePriceWrapper,CardWrapper, CreatorPurchaseTimeWrapper, PurchasesWrapper, CreatorName, TimeWrapper, PreviwBtn, LoadMoreWrapper, LoadMoreBtn, CommissionHolder, CardLeftWrapper, StatusImageWrapper, CardRightWrapper, PurchasedItemTitle, ImageStatus, TextWrap, PurchasedItemTime, PriceHolder } from "./sellings.styles";

import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LiaSuperpowers } from "react-icons/lia";
import { MdWorkspacePremium } from "react-icons/md";
import { priceFormat } from "../../../helpers/formatting";
import {BiTransferAlt} from "react-icons/bi";

const Sellings = ({margin}) => {
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
        setLoadMoreLoading(true)
        const res = await getAnUserSellingsPaginated(page);
        if(res.sellings.length != 10){
            setHasMore(false)
        }
        setSellings([...sellings ,...res.sellings])
        setLoadMoreLoading(false)
    }

    const fetchUserPurchses = async () => {
        setLoading(true)
        const res = await getAnUserSellings();
        if(res.sellings.length != 10){
            setHasMore(false)
        }
        setSellings(res.sellings)
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
            <Skeleton  height={100} width={"100%"} borderRadius={10}/>
            <Skeleton  height={100} width={"100%"} borderRadius={10} style={{margin:"15px 0px"}}/>
            <Skeleton  height={100} width={"100%"} borderRadius={10}/>
            </SkeletonTheme>
            </PurchasesWrapper>
        )
      }

    return(
        <PurchasesWrapper margin={margin}>
            {
            !loading && sellings.length == 0 ?
            <div style={{textAlign:"center"}}>
                no sellings yet
            </div> : ""
           }
            {!loading &&
                sellings.length > 0 && sellings.map((item,index)=>{
                    return(
                        <CardWrapper onClick={()=>{
                            if(item.product){
                                navigateToProfile(`creations/${item?.product?._id}`)
                            }
                            else{
                                navigateToProfile(item?.purchased_user?._id)
                            }
                            }}>
                            <CardLeftWrapper>
                                <StatusImageWrapper>
                                <ImageStatus>
                                        {
                                            item.product ? <LiaSuperpowers fontSize={45}/> :  <MdWorkspacePremium fontSize={45}/>
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
                                        <PurchasedItemTime>
                                            <BiTransferAlt style={{transform:"translate(0px,4px)"}} fontSize={18}/> {item?.purchase_history?.transaction_history[0]?.bank_ref_num}
                                        </PurchasedItemTime>
                                     </TextWrap>
                                </StatusImageWrapper>
                            </CardLeftWrapper>
                            <CardRightWrapper>
                            <PriceHolder style={{color:"green",fontSize:20}}>
                            &nbsp;{priceFormat(item?.commisson?.user_wallet_share)}
                            </PriceHolder>
                            <PriceHolder style={{fontSize:12,margin:"5px 0px",color:"red"}}>
                                        
                                        - {priceFormat(item?.commisson?.commission_share)}
                            </PriceHolder>
                            <PriceHolder style={{fontSize:12}}>
                                          + {priceFormat(item?.price)}
                            </PriceHolder>
                            </CardRightWrapper>
                        {/* <TitlePriceWrapper>
                           
                            {
                                item.product ?  <TitleContainer>{ `Creation purchased by ${item?.purchased_user?.first_name || item?.purchased_user?.user_name}`}</TitleContainer>
                                : <TitleContainer>{  `Profile purchased by ${item?.purchased_user?.first_name || item?.purchased_user?.user_name}`}</TitleContainer>
                            }
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
                         <CommissionHolder>
                            bank-ref : {item?.purchase_history?.transaction_history[0]?.bank_ref_num}
                            </CommissionHolder>
                         <ButtonWrapper>
                            <PreviwBtn onClick={()=>{
                                if(item.product){
                                    navigateToProfile(`creations/${item?.product?._id}`)
                                }
                                else{
                                    navigateToProfile(item?.purchased_user?._id)
                                }
                                }}>
                              {item.product ? "view creation" : "View User"}  
                            </PreviwBtn>
                         </ButtonWrapper> */}
                    </CardWrapper>
                    )
                })
            }
            {
          haseMore ? 
          <LoadMoreWrapper>
           {!loading &&
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