import StackGrid from "react-stack-grid";
import { AvatarHolder, AvatorContainer, BannerImage, BannerImageWrapper, CardWrapper ,DesName,GreenBtn,ImageAvatar, Name, ProfileImage, PurchaseName, PurchaseWrapper, TextNameHolder} from "../Profile/flexible.cards.styles";
import { useEffect, useState } from "react";
import { colorsV2 } from "../../../configs/theme/color";
import BannerProfile from "./Banner/BannerProfile";
import { useNavigate, useParams } from "react-router-dom";
import LazyImage from "../../../components/lazy-image/LazyImage";
import { user } from "../../../store/feature/auth";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getUserByUserIdNoAuth } from "../../../api/auth/auth-request";
import { getProfileDetails } from "../../../api/posts/posts-requests";
import { useScript } from "../../../hooks/UseScript";
import { toast } from "react-toastify";
import { PAYMENT_URL, __ENV } from "../../../configs/urls/urls";
import axiosInstance from "../../../axios/AxiosInstance";
import { getDynamicFileUrl } from "../../../helpers/get-dynamic-file-url";
import Modal from "../../../components/common/modal/Modal";
import { BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { Label, TextInput } from "../../creation/create.styles";
import FullScreenLoader from "../../../components/common/loaders/FullScreenLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FlexibleCards = ({setLoginVisible}) => {
    const params = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const urlParams = new URLSearchParams(window.location.search);
    const isRePayable = urlParams.get('isMultiplePayable');

    const [donateModal, setDonateModal] = useState(false);
    const [price, setPrice] = useState("")
    const [creator, setCreator] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [post, setPost] = useState({});
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState("")
    const [visible, setVisible] = useState(false);

    const UserRedux = useSelector(user)
   
    const isLoggedIn = cookies.get("token")

    const { EasebuzzCheckout } = useScript("https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js",  "EasebuzzCheckout")
    
    const OnPurchase = async (fromDonate) => {
        try{
  
          if(UserRedux.auth == false){
            setLoginVisible(true)
            return
          }
          if(!creator?.is_verified_user){
            toast.error("sorry !! please visit, once we verify the creator")
            return;
          }
          if(creator?.set_profile_price == false){
              if(fromDonate == false){
                setDonateModal(true)
                return;
              }
          }
          if(creator?.set_profile_price == false){
            if(fromDonate == true){
              if(
                parseInt(price) > 9 && parseInt(price) < 100001
              ){}
              else
              {
                toast.error("please enter amount between 10 & 1L")
               return;
              }
            }
          }
          if(purchaseLoading){
            return;
          }
  
          else{
            setPurchaseLoading(true)
          }
            let res = await axiosInstance.post(PAYMENT_URL+"/initiate_payment",
            {
              profile:params?.user,
              price:creator?.set_profile_price ? creator?.price : parseFloat(price) || 10,
              type:"profile"
            })
            var easebuzzCheckout = new EasebuzzCheckout(res.data.key, (__ENV == "prod" ? "prod" : "test"))
            var options = {
            access_key: res.data.access_key, // access key received via Initiate Payment
            onResponse: async (response) => {
               // console.log(response,"res")
              if(response.status === "success"){
                setPurchaseLoading(false)
                navigate("/status/payment/success",{state:{link:"/"+params.user, type:"success", name:creator?.first_name + creator?.last_name + " "+  "profile"}})
               
              }
              else{
                setPurchaseLoading(false)
                navigate("/status/payment/failure",{state:{link:"/"+params.user, type:"failure"}})
              }
                
              
            },
            theme: "#2B2B2B" // color hex
            }
            easebuzzCheckout.initiatePayment(options);
            setPurchaseLoading(false)
        }
        catch(err){
          setPurchaseLoading(false)
        }
    }

    useEffect(()=>{
        if(!isLoggedIn){
          fetchUserNoAuth()
        }
      },[])

      useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
      }, [post])

    useEffect(()=>{
        if(!loading && isRePayable == "true" && (creator?.is_user_purchased_profile && creator?.is_owner == false)){
            setStatus("not-purchased");
            setVisible(true)
            setLoading(true)
            return;
        }
        if(!loading && creator?.is_user_purchased_profile){
          setStatus("purchased");
          setVisible(false)
          setLoading(false)
        }
        else{
          if(!loading && !creator?.is_user_purchased_profile){
            setStatus("not-purchased");
            setVisible(true)
            setLoading(true)
          }
        }
      },[creator])

    const navigateToCreations = () => {
        navigate("/ui/post")
    }

    useEffect(()=>{
        if(isLoggedIn){
          fetchUserProfileDetails(0);
        }
        
      },[params.user])

      useEffect(()=>{
        if(page > 0){
          fetchUserProfileDetails(page)
        }
    },[page])

    const fetchUserNoAuth = async () => {
        setLoading(true)
        const res = await getUserByUserIdNoAuth(params.user)
       // console.log(res.user)
        setCreator(res.user[0])
        setLoading(false)
      }

      const fetchUserProfileDetails = async (skip) => {
         try{
           if(skip == 0)
           { setLoading(true)  } 
             else
           {  setLoadMoreLoading(true) }
             const res = await getProfileDetails(params?.user, skip);
             console.log(res)
             if(skip == 0){ 
               let userProfile = res?.user;
               if(res.user_creations.length < 9){
                 setHasMore(false)
               }
               setCreator(userProfile[0])
               setPost(res?.user_creations)
             }
              else
              {
               if(res.user_creations.length < 9){
                 setHasMore(false)
               }
               setPost([...post,...res.user_creations]) }
             
             if(skip == 0) { setLoading(false) }
             else
              { setLoadMoreLoading(false) }
         }
         catch(err){
           if(skip == 0){ setLoading(false) }
           else { setLoadMoreLoading(false)}
         }
       }
     
       const onLoadMore = () => {
        if(hasMore){
        setPage(page+1)
        }
      }

       const backPayClick = () => {
        setDonateModal(false)
        setVisible(true)
        setLoading(true)
      }

      const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
     
        if (scrollTop + clientHeight >= scrollHeight) {
         onLoadMore()
        }
      }

      const onViewClick = () => {
        setStatus("purchased");
         setVisible(false)
         setLoading(false)
     }
     

  const LoadingSkeleton = () =>  (
    <StackGrid monitorImagesLoaded={true}  columnWidth={332} gutterWidth={15} gutterHeight={15}>

    {
    [1,2,3,6].map((creation,i)=>{
         return(
             <div
       key={i}
      >
         <CardWrapper >
             <AvatorContainer>
                 <AvatarHolder>
                    <Skeleton width={48} height={48} circle/>
                 </AvatarHolder>
                 <TextNameHolder>
                     <Name> <Skeleton width={150} height={12} /> </Name>
                     <DesName> <Skeleton width={200} height={18} /> </DesName>
                 </TextNameHolder>
             </AvatorContainer>
            <BannerImageWrapper>
                <Skeleton height={200} width="100%"/>
            </BannerImageWrapper>
            <TextNameHolder>
                     <Name style={{marginBottom:6}}> <Skeleton width={100} height={18} /> </Name>
                     <DesName>
                           <Skeleton width="100%" height={12} />
                           <Skeleton width="100%" height={12} />
                           <Skeleton width="100%" height={12} />
                           <Skeleton width="100%" height={12} />
                      </DesName>
             </TextNameHolder>
             <DesName style={{color:colorsV2.text.medium,marginTop:20}}> </DesName>
         </CardWrapper>
     </div>
         )
     })
    } 
   </StackGrid>
  )

  return (
    <>
    <SkeletonTheme baseColor="#202020" highlightColor="#444"> 
    <div>
        <BannerProfile creator={creator} loading={loading}/>
    </div>
    <div style={{margin:20}}>
   {loading ? <LoadingSkeleton/> : ""}
   {!loading && <StackGrid monitorImagesLoaded={true}  columnWidth={332} gutterWidth={15} gutterHeight={15}>

   {
    post.length > 0 && post.map((creation,i)=>{
        return(
            <div
      key={i}
     >
        <CardWrapper onClick={navigateToCreations}>
            <AvatorContainer>
                <AvatarHolder>
                <LazyImage
                    style={{borderRadius:"50%",
                        height:"48px",
                        width:"48px",
                        objectFit:"contain",
                        background:"rgb(26, 26, 26)"
                    }}
                    height={48}
                    width={48}
                    src={creator?.profile_picture ? creator?.profile_picture : getDynamicFileUrl("avatar.svg")}/>
                    {/* <ImageAvatar src="https://source.unsplash.com/user/c_v_r/100x100"/> */}
                </AvatarHolder>
                <TextNameHolder>
                    <Name>{creator?.first_name ? (creator?.first_name +" "+ creator?.last_name ): creator?.user_name }</Name>
                    <DesName>Trusted creator from FinsCRE </DesName>
                </TextNameHolder>
            </AvatorContainer>
           <BannerImageWrapper>
           <LazyImage
                    style={{borderRadius:9,
                        height:"200px",
                        width:"100%",
                        objectFit:"cover"
                    }}
                    height={200}
                    width={"100%"}
                    src={creation?.banner_img}/>
            {/* <BannerImage /> */}
           </BannerImageWrapper>
           <TextNameHolder>
                    <Name style={{marginBottom:6}}> {creation?.title} </Name>
                    <DesName>
                       {creation?.description} </DesName>
            </TextNameHolder>
            <DesName style={{color:colorsV2.text.medium,marginTop:20}}>#{creation?.type} </DesName>
        </CardWrapper>
    </div>
        )
    })
   } 
  </StackGrid>}
  </div>
  <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper style={{paddingLeft:20}}>
             <ProfileImage src={creator?.profile_picture} >

             </ProfileImage>
             <PurchaseName>
             {creator?.first_name}
             </PurchaseName>
             <div style={{display:"flex"}}>
             <GreenBtn onClick={()=>{
              OnPurchase(false)
              //setLoading(false)
             }}>
                Purchase {creator?.set_profile_price == true ? `₹${creator?.price.toLocaleString()}` : ""}
              </GreenBtn> 
              {creator?.is_user_purchased_profile &&  <GreenBtn
               onClick={() => onViewClick()}
              style={{marginLeft:10,padding:"13px 10px 5px 10px"}}>
                <BsFillEyeFill/>
              </GreenBtn>}
              </div>
          </PurchaseWrapper>
           
        } auth={false}/> 
         <Modal isVisible={donateModal} setVisible={setDonateModal} component={
          <PurchaseWrapper style={{paddingLeft:20,position:"relative"}}>
            <div style={{color:"black", position:"absolute", top:5, left:10}} >
              <BiArrowBack fontSize="20px" onClick={()=>{backPayClick()}}/>
            </div>
             <div style={{marginBottom:20}}> <Label style={{color:"black",textAlign:"center",fontWeight:"bold"}}>
                Amount
              </Label>
              <TextInput placeholder="Enter your payment amount" value={price} onChange={(e)=>setPrice(e.target.value)}>

              </TextInput></div>
             <GreenBtn onClick={()=>{
              OnPurchase(true)
              //setLoading(false)
             }}>
                Pay Now
              </GreenBtn> 
             
          </PurchaseWrapper>
           
        } auth={false}/> 
        </SkeletonTheme > 
  </>
  );
}

export default FlexibleCards