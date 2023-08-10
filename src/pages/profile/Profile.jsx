import { useEffect, useState } from "react";
import { ButtonWrapper, ChangeProfilePicText, Label, LoaderHolder, ProfileImage, ProfileImageWrapper, ProfileWrapper, SubmitBtn, TextInput, Textarea } from "./profile.styles";
import { useSelector } from "react-redux";
import { user } from "../../store/feature/auth";
import Validate from 'max-validator';
import { updateAnUserDetails } from "../../api/auth/auth-request";
import UploadBlock from "../../components/common/upload/UploadBlock";
import { toast } from 'react-toastify';
import Toastholder from "../../components/common/toast/Toastholder";
import SimpleLoader from "../../components/common/loaders/SimpleLoader";
import SwitchButton from "../../components/common/switchButton/SwitchButton";

import Avatar from "../../assets/avatar.svg"
const validationSchema =  {
    firstName:'required|string|min:3|max:50',
    lastName:'required|string|min:3|max:50',
    profilePicture:'required|string|min:3|max:500',
    email:'required|string|min:3|max:50',
    userName:"string|min:3",
    bio:'required|string|min:3|max:400',
    links:`object`,
    isPurchasableProfile:'required|string',
    bannerImage:`string`
}


const Profile = () => {

    const userDetails = useSelector(user)
    console.log(userDetails,"details");
    

    const [buttonLoading, setButtonLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);

    const[purchasableToggle, setPurchasableToggle] = useState(false);
    const [firstName,setFirstname] = useState("");
    const [lastName,setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [banImg, setBannerImg] = useState("")
    const[profilePicture, setProfilePicture] = useState([]);

    const [click,setClick] = useState(false);
    const onSubmit = async () => {
        setButtonLoading(true)
        const dataTosend = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            profilePicture:profilePicture[0]?.url,
            bio:bio,
            links:{
                website:website,
                facebook:facebook,
                instagram:instagram,
                twitter:twitter
            },
            isPurchasableProfile:`${purchasableToggle}`,
            bannerImage:banImg[0]?.url
        }
        if(userName !== userDetails.user?.user_name){
           dataTosend.userName = userName 
        }
        console.log(dataTosend,"sss")
        const results = Validate.validate(dataTosend, validationSchema)
        console.log(results)
        if(results?.hasError){
            toast.error(Object.values(results?.errors)[0][0])
            // setToastText(Object.values(results?.errors)[0][0]);
            // setToastType(toastBodyTypes.error);
            // setShowToast(true)
             setButtonLoading(false)
            return;
        }
        const res = await updateAnUserDetails(dataTosend)
        if(res.status){
            toast.success("profile saved successfully")
            // setToastText("successfully updated");
            // setToastType(toastBodyTypes.success);
            // setShowToast(true)
            setButtonLoading(false)
            return;
        }
        else{
            toast.error(res.message)
        }
        setButtonLoading(false)
     }

     console.log(profilePicture[0]?.url)

    useEffect(()=>{
        if(userDetails){
            setFirstname(userDetails.user?.first_name)
            setLastName(userDetails.user?.last_name)
            setEmail(userDetails.user?.email)
            setBio(userDetails.user?.bio)
            setuserName(userDetails.user?.user_name)
            setProfilePicture(userDetails?.user?.profile_picture ? [{url:userDetails?.user?.profile_picture}] : [])
            setWebsite(userDetails?.user?.links?.website)
            setInstagram(userDetails?.user?.links?.instagram)
            setFacebook(userDetails?.user?.links?.facebook)
            setTwitter(userDetails?.user?.links?.twitter)
            setPurchasableToggle(userDetails?.user?.is_purchasable_profile)
            setBannerImg(userDetails?.user?.banner_image ? [{url:userDetails?.user?.banner_image}] : "")
        }
    },[userDetails])

    
    const removeBannerImage = async () => {
        setBannerImg("")
    }

    console.log(bio,"bio")

    if(userDetails?.loading){
        return(<LoaderHolder> <SimpleLoader/></LoaderHolder>)
    }

    return(
        <>
        <ProfileWrapper>
            <ProfileImageWrapper onClick={()=>{
                if(!fileLoading){  setClick(true)}}
              
                }>
            <ProfileImage src={profilePicture[0]?.url ? profilePicture[0]?.url : Avatar} 
             
            />
            <ChangeProfilePicText>
              {fileLoading ? "loading" : "change picture"}  
            </ChangeProfilePicText>
          <div style={{display:"none"}}> <UploadBlock
            label="upload profile"
            url={profilePicture}
            setUrl={setProfilePicture}
            click={click}
            setClick={setClick}
            accept="image/jpeg"
            setFileLoading={setFileLoading}
            /></div>
           
            </ProfileImageWrapper>
           
           <div >
           <Label style={{marginBottom:10}}>
              Profile purchasable
            </Label>
           <SwitchButton checked={purchasableToggle} setChecked={setPurchasableToggle}/>
           </div>
           
           <Label style={{marginBottom:10}}>
            Banner Image
           </Label>
           {banImg ? 
                            <div>
                              <span style={{float:"right", cursor:"pointer"}} onClick={removeBannerImage}>X</span>  
                                 <img
                                style={{width:"100%",height:200,objectFit:"cover"}}
                                src={banImg[0]?.url}
                             />
                             </div>
                            : <UploadBlock
                                 url={banImg}
                                 setUrl={setBannerImg}
                                 accept="image/jpeg"
                                 label="Banner Image"
                                 id="remb"
                 /> }

            <Label>
                First name
            </Label>
            <TextInput type="text" placeholder="Enter your first name" value={firstName} onChange={(e)=>{setFirstname(e.target.value)}}/>

            <Label>
                Last name
            </Label>
            <TextInput type="text" placeholder="Enter your last name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>

            <Label>
                UserName
            </Label>
            <TextInput type="text" placeholder="Enter your username" value={userName} onChange={(e)=>{setuserName(e.target.value)}}/>

            <Label>
                Email
            </Label>
            <TextInput type="text" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <Label>
                Bio
            </Label>
            <Textarea type="text" placeholder="Enter your bio" rows={5} value={bio}
            onChange={(e)=>{setBio(e.target.value)}}
            />

            <Label>
                website
            </Label>
            <TextInput type="text" placeholder="Enter your website link" value={website} onChange={(e)=>{setWebsite(e.target.value)}}/>

            <Label>
                facebook
            </Label>
            <TextInput type="text" placeholder="Enter your facebook link" value={facebook} onChange={(e)=>{setFacebook(e.target.value)}}/>

            <Label>
                instagram
            </Label>
            <TextInput type="text" placeholder="Enter your instagram link" value={instagram} onChange={(e)=>{setInstagram(e.target.value)}}/>

            <Label>
                twitter
            </Label>
            <TextInput type="text" placeholder="Enter your twitter link" value={twitter} onChange={(e)=>{setTwitter(e.target.value)}}/>

            <ButtonWrapper>
                {
                    buttonLoading ? (
                     <SimpleLoader/>
                    ):
                    ( <SubmitBtn onClick={onSubmit}>
                        Save
                    </SubmitBtn>)
                }
               
            </ButtonWrapper>
        
        </ProfileWrapper>
            <Toastholder/>
        </>
    )
}

export default Profile;