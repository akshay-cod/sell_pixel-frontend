
import CustomLineChart from "../../../components/charts/CustomLineChart";
import TableUI from "../../../components/tables/TableUI";
import { priceFormat } from "../../../helpers/formatting";
import { BalanceDetailsInsideLeft, BalanceDetailsInsideRight, BalanceDetailsInsideWrapper, BalanceDetailsLeft, BalanceDetailsRight, BalanceTitle, BalnceMoney, CardWithDrawalWrapper, DashboardLeftWrapper, DashboardRightWrapper, DashboardWrapper, GraphWrapper, IconWrapper, ListingTransactions } from "./dashboard.styles";
import { HiCurrencyRupee } from "react-icons/hi"
import WithDrawUi from "./withdraw/Withdraw";
import Index from "../../profile/purchases/Index";

const Dashboard = () => {
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
                                {priceFormat(2000.00)}
                                </BalnceMoney>
                            </BalanceDetailsInsideRight>
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
                                     {priceFormat(3000)}
                                </BalnceMoney>
                            </BalanceDetailsInsideRight>
                     </BalanceDetailsInsideWrapper>

                   

                </BalanceDetailsLeft>
                <GraphWrapper >
                        <CustomLineChart />
                </GraphWrapper>
                <GraphWrapper >
                    <div
                    style={{
                        padding: "10px 10px",
                        color: "#656565",
                        fontFamily: "GraphikSemiBold"
                    }}
                    >Top Selling Products</div>
                  <TableUI/>
                  </GraphWrapper>
            </DashboardLeftWrapper>
           
           <DashboardRightWrapper>
                    <CardWithDrawalWrapper style={{minHeight:220}}>
                         <WithDrawUi/>       
                    </CardWithDrawalWrapper>
                    <ListingTransactions className="customScroll" >
                              <Index margin={"25px 25px"}/>  
                    </ListingTransactions>
           </DashboardRightWrapper>

        </DashboardWrapper>
    </div>
      );
}

export default Dashboard;