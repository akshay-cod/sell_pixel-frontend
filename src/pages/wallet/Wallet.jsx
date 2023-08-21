
import { useState } from "react";
import BankDetails from "../../components/bank/BankDetails";
import Modal from "../../components/common/modal/Modal";
import WithDraw from "../../components/withdraw/Withdraw";
import { priceFormat } from "../../helpers/formatting";
import {WithdrawWrapper, BankDetailsWrapper, WalletCard, WalletHeading, WalletMoneyText, WalletTotalBalanceText, WalletWrapper, WithDrawbanWrapper } from "./wallet.styles";
import { useSelector } from "react-redux";
import { user } from "../../store/feature/auth";

const Wallet = () => {
    const userFromRedux = useSelector(user);
    const [withDrawModal, setWithdrawModal] = useState(false);
    const [BankModal, setBankModal] = useState(false);

    const openWithDrawModal = ()=> {
        setWithdrawModal(true)
      }

      const openBankModal = ()=> {
        setBankModal(true)
      }
    return(
        <>
        <WalletWrapper>
            <WalletHeading>
                Wallet
            </WalletHeading>
            <WalletCard>
                 <WalletMoneyText>
                    {priceFormat(userFromRedux?.user?.wallet?.wallet_balance || 0)}
                 </WalletMoneyText>
                 <WalletTotalBalanceText>
                    Total Balance
                 </WalletTotalBalanceText>
                 <WithDrawbanWrapper>
                    <WithdrawWrapper onClick={()=>{openWithDrawModal()}}>
                        Withdraw
                    </WithdrawWrapper>
                    <BankDetailsWrapper onClick={()=>{openBankModal()}}>
                        Bank Details
                    </BankDetailsWrapper>
                 </WithDrawbanWrapper>
            </WalletCard>
        </WalletWrapper>
            <Modal isVisible={withDrawModal} setVisible={setWithdrawModal} component={
                 <WithDraw setBankModal={setBankModal} setWithdrawModal={setWithdrawModal}/>
                        } auth={true}/>  
            <Modal isVisible={BankModal} setVisible={setBankModal} component={
            <BankDetails /> } auth={true}/>  
        </>
    )
}

export default Wallet;