import { useSelector } from "react-redux";
import { FreeMoneyLeftSide, FreeMoneyRightSide, FreeMoneyWrapper, HeaderLeft, HeaderRight, LanguageLeftSide, LanguageRightSide, LanguageWrapper, LogOutBtn, LoginBtn, MenuItem, RegistorBtn, StickyHeaderLeft, StickyHeaderRight, WithDrawBtn, Wrapper, WrapperStickyHeader } from "./header.styles";
import { user } from "../../store/feature/auth";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { useRef, useState } from "react";
import './header.css'
import Modal from "../common/modal/Modal";
import WithDraw from "../withdraw/Withdraw";
import BankDetails from "../bank/BankDetails";
import Avatar from "../../assets/avatar.svg"

const Header = ({setVisible}) => {
    const userFromRedux = useSelector(user);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const [withDrawModal, setWithdrawModal] = useState(false);
    const [BankModal, setBankModal] = useState(false);

    const logOutUser = () => {
        localStorage.clear("token");
        setIsActive(false)
        window.location.reload()
    }

    const onClick = () => setIsActive(!isActive);

    const navigateToPurchses = () => {
      navigate('profile/purchases');
      setIsActive(false)
    }

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

      const openWithDrawModal = ()=> {
        setWithdrawModal(true)
        setIsActive(false)
      }

      const openBankModal = ()=> {
        setBankModal(true)
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
                <span>{userFromRedux?.user?.first_name || userFromRedux?.user?.phone_number}</span>
                <img
                  className="profileImage"
                  src={userFromRedux?.user?.profile_picture ? userFromRedux?.user?.profile_picture : Avatar}
                  alt="User avatar"
                />
              </button>
              <nav
                
                className={`menu ${isActive ? "active" : "inactive"}`}
              >
                <ul>
                <li >
                    <a >Earnings : ₹{userFromRedux?.user?.wallet?.wallet_balance.toLocaleString()}
                    <WithDrawBtn
                    onClick={openWithDrawModal}
                    >Withdraw</WithDrawBtn>
                    </a>
                    
                  </li>

                 <li onClick={navigateToUser }>
                    <a >User</a>
                  </li>

                  <li onClick={navigateToProfile}>
                    <a >Profile</a>
                  </li>

                  <li onClick={navigateToCreate}>
                    <a >Create</a>
                  </li>

                  <li onClick={navigateToPurchses}>
                    <a >Purchases</a>
                  </li>

                  <li onClick={openBankModal}>
                    <a >Bank details</a>
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
    <Modal isVisible={withDrawModal} setVisible={setWithdrawModal} component={
      <WithDraw setBankModal={setBankModal} setWithdrawModal={setWithdrawModal}/>
        } auth={true}/>  
       <Modal isVisible={BankModal} setVisible={setBankModal} component={
      <BankDetails />
        } auth={true}/>  
    </>
    )
}

export default Header;