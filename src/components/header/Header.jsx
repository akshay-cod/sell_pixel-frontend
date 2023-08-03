import { useSelector } from "react-redux";
import { FreeMoneyLeftSide, FreeMoneyRightSide, FreeMoneyWrapper, HeaderLeft, HeaderRight, LanguageLeftSide, LanguageRightSide, LanguageWrapper, LogOutBtn, LoginBtn, MenuItem, RegistorBtn, StickyHeaderLeft, StickyHeaderRight, Wrapper, WrapperStickyHeader } from "./header.styles";
import { user } from "../../store/feature/auth";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { useRef } from "react";
import './header.css'

const Header = ({setVisible}) => {
    const userFromRedux = useSelector(user);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const logOutUser = () => {
        localStorage.clear("token");
        window.location.reload()
    }

    const onClick = () => setIsActive(!isActive);

    const navigateToProfile = ()=>{
            navigate(`${userFromRedux?.user?._id}`);
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

    console.log(userFromRedux, isActive,"user")
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
              <button onClick={()=> {onClick()}} className="menu-trigger">
                <span>{userFromRedux?.user?.first_name}</span>
                <img
                  className="profileImage"
                  src={userFromRedux?.user?.profile_picture}
                  alt="User avatar"
                />
              </button>
              <nav
                
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                <ul>
                <li onClick={navigateToUser }>
                    <a href="#">Earnings : ₹{userFromRedux?.user?.wallet?.wallet_balance.toLocaleString()}</a>
                  </li>

                 <li onClick={navigateToUser }>
                    <a href="#">User</a>
                  </li>

                  <li onClick={navigateToProfile}>
                    <a href="#">Profile</a>
                  </li>

                  <li onClick={navigateToCreate}>
                    <a href="#">Create</a>
                  </li>
                 
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
           
           : <><LoginBtn
           onClick={()=>setVisible(true)}
           >
                Login
            </LoginBtn>
            </>}
        </StickyHeaderRight>
    </WrapperStickyHeader>
   
    </>
    )
}

export default Header;