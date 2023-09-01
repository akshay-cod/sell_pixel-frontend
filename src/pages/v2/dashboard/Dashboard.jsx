
import CustomLineChart from "../../../components/charts/CustomLineChart";
import TableUI from "../../../components/tables/TableUI";
import { priceFormat } from "../../../helpers/formatting";
import { BalanceDetailsInsideLeft, BalanceDetailsInsideRight, BalanceDetailsInsideWrapper, BalanceDetailsLeft, BalanceDetailsRight, BalanceTitle, BalnceMoney, CardWithDrawalWrapper, DashboardLeftWrapper, DashboardRightWrapper, DashboardWrapper, GraphWrapper, IconWrapper, ListingTransactions, TableHolder } from "./dashboard.styles";
import { HiCurrencyRupee } from "react-icons/hi"
import WithDrawUi from "./withdraw/Withdraw";
import Index from "../../profile/purchases/Index";
import { useEffect } from "react";
import { getDashboardDetails } from "../../../api/dashboard/dashboard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/feature/auth";
import Modal from "../../../components/common/modal/Modal";
import BankDetails from "../../../components/bank/BankDetails";
import WithDraw from "../../../components/withdraw/Withdraw";
import { toast } from "react-toastify";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";
import SwitchButton from "../../../components/common/switchButton/SwitchButton";

const Dashboard = () => {
const userRedux = useSelector(user);
const [dashboardDetails, setDashboardDetails] = useState({})
const [loading, setLoading] = useState(true);
const [earningsToggle, setEarningsToggle] = useState(false)
const [earningsTotalToggle,setEarningsTotalToggle] = useState(false);
useEffect(() => {
    getDashBoardDetailsFromApi();
},[])

const [withDrawModal, setWithdrawModal] = useState(false);
const [BankModal, setBankModal] = useState(false);

const openWithDrawModal = ()=> {
    if(!userRedux?.user?.is_verified_user){
        toast.error("Withdrawal process starts after Finscre approves. Please contact support@finscre.com for assistance")
        return;
    }
    else{
        setWithdrawModal(true)
    }
   
  }

  const openBankModal = ()=> {
    if(!userRedux?.user?.is_verified_user){
        toast.error("Contact Finscre support@finscre.com for approval for adding bank details ")
        return;
    }
    else{
    setBankModal(true)
    }
  }

const getDashBoardDetailsFromApi = async () => {
    setLoading(true)
    const res = await getDashboardDetails();
    setDashboardDetails(res?.dashboard)
    setLoading(false)
}

if(loading){
    return<div
    style={{height:"100vh"}}
    ><div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
       
    }}>  <SimpleLoader/></div>
       
    </div>
}

return(
    <div>
      
        <DashboardWrapper>
            <DashboardLeftWrapper>

                <BalanceDetailsLeft>

                <BalanceDetailsInsideWrapper>
                            <BalanceDetailsInsideLeft>
                               <IconWrapper>
                                  <HiCurrencyRupee fontSize={48} color="hsl(150.51deg 47.2% 49.02%)" style={{transform:"translate(1px, 2px)"}}/>
                               </IconWrapper>
                            </BalanceDetailsInsideLeft>
                            <BalanceDetailsInsideRight>
                                <BalanceTitle>
                                     Earnings
                                </BalanceTitle>
                                <BalnceMoney>
                                    {
                                        earningsToggle ?
                                        <div>
                                             {priceFormat(userRedux?.user?.wallet?.wallet_balance)}
                                        </div>
                                        :
                                        <div>₹XXXX</div>
                                    }
                               
                                </BalnceMoney>
                               
                            </BalanceDetailsInsideRight>
                            <div style={{marginLeft:15}}>
                            <SwitchButton checked={earningsToggle} setChecked={setEarningsToggle}/>
                            </div>
                           
                  </BalanceDetailsInsideWrapper>

                   <BalanceDetailsInsideWrapper style={{background:"hsl(288.29deg 47.13% 65.88%)"}}>
                            <BalanceDetailsInsideLeft>
                            <IconWrapper>
                                  <HiCurrencyRupee fontSize={48} style={{transform:"translate(1px, 2px)"}} color="hsl(288.29deg 47.13% 65.88%)"/>
                               </IconWrapper>
                            </BalanceDetailsInsideLeft>
                            <BalanceDetailsInsideRight>
                                <BalanceTitle>
                                    Total Earnings
                                </BalanceTitle>
                                <BalnceMoney>
                                {
                                        earningsTotalToggle ?
                                        <div>
                                             {priceFormat(dashboardDetails?.total_earnings[0]?.sum ? dashboardDetails?.total_earnings[0]?.sum : 0)}
                                        </div>
                                        :
                                        <div>₹XXXX</div>
                                    }
                                    
                                </BalnceMoney>
                            </BalanceDetailsInsideRight>
                            <div style={{marginLeft:15}}>
                            <SwitchButton checked={earningsTotalToggle} setChecked={setEarningsTotalToggle}/>
                            </div>
                     </BalanceDetailsInsideWrapper>

                   

                </BalanceDetailsLeft>
                <GraphWrapper >
                        <CustomLineChart sellingsData ={dashboardDetails?.sellings} purchaseData={dashboardDetails?.purchases}/>
                </GraphWrapper>
                <GraphWrapper >
                    <div
                    style={{
                        padding: "10px 10px",
                        color: "#656565",
                        fontFamily: "GraphikSemiBold"
                    }}
                    >Selling Products</div>
                    <TableHolder >
                    <TableUI  sellingsData ={dashboardDetails?.sellings}/>
                    </TableHolder>
                  
                  </GraphWrapper>
            </DashboardLeftWrapper>
           
           <DashboardRightWrapper>
                    <CardWithDrawalWrapper style={{minHeight:280}}>
                         <WithDrawUi openBankModal={openBankModal} openWithDrawModal={openWithDrawModal}/>       
                    </CardWithDrawalWrapper>
                    <ListingTransactions className="customScroll" >
                              <Index margin={"25px 25px"}/>  
                    </ListingTransactions>
           </DashboardRightWrapper>

        </DashboardWrapper>
        <Modal isVisible={withDrawModal} setVisible={setWithdrawModal} component={
                 <WithDraw setBankModal={setBankModal} setWithdrawModal={setWithdrawModal}/>
                        } auth={true}/>  
            <Modal isVisible={BankModal} setVisible={setBankModal} component={
            <BankDetails /> } auth={true}/> 
    </div>
      );
}

export default Dashboard;