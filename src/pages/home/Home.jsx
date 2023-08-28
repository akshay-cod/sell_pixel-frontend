import { useSelector } from "react-redux";
import { colors } from "../../configs/theme/color";
import Modal from "../../components/common/modal/Modal";
import { useEffect, useState } from "react";
import BannerWithImage from "./profile/BannerWithImage";
import Posts from "./post/Posts";
import { user } from "../../store/feature/auth";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileDetails } from "../../api/posts/posts-requests";
import { GreenBtn, LoadMoreBtn, LoadMoreWrapper, Name, ProfileImage, PurchaseWrapper } from "./home.styles";
import { useScript } from "../../hooks/UseScript";
import axiosInstance from "../../axios/AxiosInstance";
import { PAYMENT_URL, __ENV } from "../../configs/urls/urls";
import SimpleLoader from "../../components/common/loaders/SimpleLoader";
import { getUserByUserIdNoAuth } from "../../api/auth/auth-request";
import { Label } from "../../components/withdraw/widthdraw.styles";
import { TextInput } from "../../components/bank/bank-details.styles";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { isMobile } from "react-device-detect";
import { BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";


const Home = ({setLoginVisible}) => {
  const params = useParams();
  const [donateModal, setDonateModal] = useState(false);
  const [price, setPrice] = useState("")
  const [creator, setCreator] = useState({});
  const UserRedux = useSelector(user)
  const navigate = useNavigate();

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
              // let verify = await axiosInstance.post(PAYMENT_URL+"/verify_payment",
              // {
              //   response:response,
              //   price:creator?.set_profile_price ? creator?.price : parseFloat(price) || 10,
              //   profile:params?.user,
              //   type:"profile"
              // }
              // )
             // console.log(verify)
              setPurchaseLoading(false)
              navigate("/status/payment/success",{state:{link:"/"+params.user, type:"success", name:creator?.first_name + creator?.last_name + " "+  "profile"}})
              // window.location.reload()
            }
            else{
              setPurchaseLoading(false)
              navigate("/status/payment/failure",{state:{link:"/"+params.user, type:"failure"}})
            }
              
             // document.getElementById('response').innerText=JSON.stringify(response);
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

  const urlParams = new URLSearchParams(window.location.search);
  const isRePayable = urlParams.get('isMultiplePayable');
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [post, setPost] = useState({});
  const [page, setPage] = useState(0)
  const [status, setStatus] = useState("")
 // console.log(page)
  useEffect(()=>{
      if(page > 0){
        fetchUserProfileDetails(page)
      }
  },[page])
  
  const [visible, setVisible] = useState(false);
  const cookies = new Cookies();
 
  const isLoggedIn = cookies.get("token")
 // console.log(creator)

  useEffect(()=>{
    if(isLoggedIn){
      fetchUserProfileDetails(0);
    }
    
  },[params.user])

  useEffect(()=>{
    if(!isLoggedIn){
      fetchUserNoAuth()
    }
  },[])

  const onViewClick = () => {
     setStatus("purchased");
      setVisible(false)
      setLoading(false)
  }

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
      if(!creator._id){
        //window.location.replace("http://stackoverflow.com");
      }
    }
    else{
      if(!loading && !creator?.is_user_purchased_profile){
        setStatus("not-purchased");
        setVisible(true)
        setLoading(true)
      }
    }
  },[creator])
//console.log(post)
  const onLoadMore = () => {
    setPage(page+1)
  }

  const fetchUserNoAuth = async () => {
    setLoading(true)
    const res = await getUserByUserIdNoAuth(params.user)
   // console.log(res.user)
    setCreator(res.user[0])
    setLoading(false)
  }

  const fetchUserProfileDetails = async (skip) => {
   // console.log("truuu")
    try{
      if(skip == 0)
      { setLoading(true)  } 
        else
      {  setLoadMoreLoading(true) }
        const res = await getProfileDetails(params?.user, skip);
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

  const backPayClick = () => {
    setDonateModal(false)
    setVisible(true)
    setLoading(true)
  }


    return(
      <>
          
      {
        status === "purchased" ?
        <>
       
         <BannerWithImage creator={creator} loading={loading} image={creator?.banner_image}/>
       <div style={{paddingLeft:isMobile ? 0 : 25,paddingRight:isMobile ? 0 :25,background:colors.primary}}>
         <Posts post={post} loading={loading} creator={creator} />
         {
            !loading && post.length == 0 ?
            <div style={{textAlign:"center"}}>
                no creations yet
            </div> : ""
           }
        
        {
          hasMore ? 
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
        </div>
        </>
        :
        <>
         <BannerWithImage creator={creator} loading={loading}/>
       <div style={{background:colors.primary}}>
         <Posts post={post} loading={loading} />
         
        </div>
        </>
      }
     
        <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper style={{paddingLeft:20}}>
             <ProfileImage src={creator?.profile_picture} >

             </ProfileImage>
             <Name>
             {creator?.first_name}
             </Name>
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
      </>
    )
}

export default Home;