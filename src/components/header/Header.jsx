import { useSelector } from "react-redux";
import { FreeMoneyLeftSide, FreeMoneyRightSide, FreeMoneyWrapper, HeaderLeft, HeaderRight, LanguageLeftSide, LanguageRightSide, LanguageWrapper, LogOutBtn, LoginBtn, MenuItem, RegistorBtn, StickyHeaderLeft, StickyHeaderRight, WithDrawBtn, Wrapper, WrapperStickyHeader } from "./header.styles";
import { user } from "../../store/feature/auth";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { useRef, useState } from "react";
import './header.css'
import Cookies from 'universal-cookie';
import { getDynamicFileUrl } from "../../helpers/get-dynamic-file-url";
import { useEffect } from "react";
import { colorsV2 } from "../../configs/theme/color";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { capitalizeFirstLetter } from "../../helpers/common";

const Header = ({setVisible}) => {
    const userFromRedux = useSelector(user);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const logOutUser = () => {
        const cookies = new Cookies();
        cookies.remove("token",{ path: '/'})
        console.log(cookies.get("token"))
      //  setIsActive(false)
        window.location.href = window.location.href;
    }

    useEffect(()=>{
    // window.document.cookie.addEventListener("change",(e)=>{console.log(e)})
   //   return ()=> {document.cookie onChanged.removeListener()}
   //console.log(document.getElementById("cookies"),"ddd")
    },[])
   
    const onClick = () => setIsActive(!isActive);

    const navigateToPurchses = () => {
      navigate('user/dashboard');
      setIsActive(false)
    }

    const navigateToProfile = ()=>{
            navigate(`${userFromRedux?.user?.user_name}`);
            setIsActive(false)
        }
    
    const navigateToUser = ()=>{
                navigate('profile/edit');
                setIsActive(false)
            }

     const navigateToCreate = ()=>{
                navigate('creations/create');
                setIsActive(false)
            }
      
      const navigateToWallet = () => {
        navigate('user/wallet');
        setIsActive(false)
      }


    return (
    <>
   
    <WrapperStickyHeader>
        <StickyHeaderLeft>
                <MenuItem onClick={()=>{window.location.replace("http://finscreindia.com");}}>
                   FinsCre
                </MenuItem>
                {/* <MenuItem>
                    Home
                </MenuItem> */}
                {/* <MenuItem onClick={()=>{navigate("/avaitor")}}>
                   Aviator
                </MenuItem> */}
        </StickyHeaderLeft>
        <StickyHeaderRight>
           {userFromRedux?.auth ? 
            <div className="container" ref={dropdownRef}>
            <div className="menu-container">
              <button onClick={()=> {onClick()}} style={{background:colorsV2.block.medium}} className="menu-trigger">
                <span>{ capitalizeFirstLetter(userFromRedux?.user?.first_name || userFromRedux?.user?.phone_number)}</span>
                <img
                  className="profileImage"
                  src={userFromRedux?.user?.profile_picture ?  (userFromRedux?.user?.profile_picture_urls ? userFromRedux?.user?.profile_picture_urls?.url_object?.avatar : userFromRedux?.user?.profile_picture) : getDynamicFileUrl("avatar.svg")}
                  alt="User avatar"
                />
              </button>
              <nav
                style={{background:colorsV2.block.dark}}
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                <ul>

                  <li onClick={navigateToProfile}>
                    <a >Profile</a>
                  </li>

                 <li onClick={navigateToUser }>
                    <a >Edit Premium Profile</a>
                  </li>

                  <li onClick={navigateToCreate}>
                    <a >Create Premium Content</a>
                  </li>

                  <li onClick={navigateToPurchses}>
                    <a >Dashboard</a>
                  </li>

                  {/* <li onClick={navigateToWallet}>
                    <a >Wallet</a>
                  </li> */}
                 
                  <li onClick={logOutUser}>
                    <a href="#">
                     <LogOutBtn>
                         Logout
                     </LogOutBtn> 
                     </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
           
           : <>
           {userFromRedux.loading ?
           <SkeletonTheme baseColor="#202020" highlightColor="#444"> 
           <Skeleton width={100} height={30} borderRadius={10}/>
           </SkeletonTheme>  
           :
           <LoginBtn
           onClick={()=>setVisible(true)}
           >
                Login
            </LoginBtn>}
            </>}
        </StickyHeaderRight>
    </WrapperStickyHeader>
    </>
    )
}

export default Header;