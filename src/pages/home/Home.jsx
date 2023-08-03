import { useSelector } from "react-redux";
import { Header, Footer } from "../../components";
import GameListCard from "../../components/game-list-card/GameListCard";
import { colors } from "../../configs/theme/color";
import Catogary from "./catogory-lists/Catogary";
import GameList from "./game-list/GameList";
import InlineBanners from "./in-line-banners/InlineBanners";
import { selectCount } from "../../store/feature/sample";
import Modal from "../../components/common/modal/Modal";
import { useEffect, useState } from "react";
import Login from "./login/Login";
import BannerWithImage from "./profile/BannerWithImage";
import Posts from "./post/Posts";
import { user } from "../../store/feature/auth";
import { useParams } from "react-router-dom";
import { getProfileDetails } from "../../api/posts/posts-requests";
import { GreenBtn, Name, ProfileImage, PurchaseWrapper } from "./home.styles";
import { useScript } from "../../hooks/UseScript";
import axiosInstance from "../../axios/AxiosInstance";
import { PAYMENT_URL } from "../../configs/urls/urls";


const Home = ({setLoginVisible}) => {
  const params = useParams();
  const [creator, setCreator] = useState({});
  const UserRedux = useSelector(user)

  const { EasebuzzCheckout } = useScript("https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js",  "EasebuzzCheckout")
    
  const OnPurchase = async () => {
      try{
        if(UserRedux.auth == false){
          setLoginVisible(true)
          return
        }
          let res = await axiosInstance.post(PAYMENT_URL+"/initiate_payment",
          {
            profile:params?.user,
            price:creator?.profile_price || 10,
          })
          var easebuzzCheckout = new EasebuzzCheckout(res.data.key, "test")
          var options = {
          access_key: res.data.access_key, // access key received via Initiate Payment
          onResponse: async (response) => {
            //  console.log(response,"res")
            if(response.status === "success"){
              let verify = await axiosInstance.post(PAYMENT_URL+"/verify_payment",
              {
                response:response,
                price:creator?.profile_price || 10,
                profile:params?.user
              }
              )
              console.log(verify)
              window.location.reload()
            }
            else{

            }
              
             // document.getElementById('response').innerText=JSON.stringify(response);
          },
          theme: "#2B2B2B" // color hex
          }
          easebuzzCheckout.initiatePayment(options);
      }
      catch(err){

      }
  }

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const [status, setStatus] = useState("")
  
  
  const [visible, setVisible] = useState(false)
  console.log(creator)

  useEffect(()=>{
    fetchUserProfileDetails();
  },[])

  useEffect(()=>{

    if(creator?.is_user_purchased_profile){
      setStatus("purchased");
      setVisible(false)
      if(!creator._id){
        //window.location.replace("http://stackoverflow.com");
      }
    }
    else{
      setStatus("not-purchased");
      setVisible(true)
      setLoading(true)
    }
  },[creator])

  const fetchUserProfileDetails = async () => {
    console.log("truuu")
    try{
       setLoading(true)
        const res = await getProfileDetails(params?.user);
        setPost(res?.user_creations)
        let userProfile = res?.user;
        userProfile[0].is_purchasable_profile = true;
        userProfile[0].is_profile_purchased = false;
        setCreator(userProfile[0])
        setLoading(false)
    }
    catch(err){
     setLoading(true)
    }
  }


    return(
      <>
      {
        status === "purchased" ?
        <>
       
         <BannerWithImage creator={creator} loading={loading}/>
       <div style={{paddingLeft:25,paddingRight:25,background:colors.primary}}>
         <Posts post={post} loading={loading}/>
      
        </div>
        </>
        :
        <>
         <BannerWithImage creator={creator} loading={loading}/>
       <div style={{paddingLeft:25,paddingRight:25,background:colors.primary}}>
         <Posts post={post} loading={loading}/>
      
        </div>
        </>
      }
     
        <Modal isVisible={visible} setVisible={setVisible} component={
          <PurchaseWrapper>
             <ProfileImage src={creator?.profile_picture} >

             </ProfileImage>
             <Name>
             {creator?.first_name}
             </Name>
             <GreenBtn onClick={()=>{
              OnPurchase()
              //setLoading(false)
             }}>
                Purchase
              </GreenBtn> 
          </PurchaseWrapper>
           
        } auth={false}/> 
      </>
    )
}

export default Home;