import { toast } from "react-toastify";
import { raiseAwithdrawRequest } from "../../../../api/withdraw/withdraw-request";
import { ButtonWithDraw, Label, TextInput, WithDrawWrapper } from "./withdraw.styles";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoggedIn, user } from "../../../../store/feature/auth";
import { useState } from "react";

const WithDrawUi = () =>{
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);
    const [bankDetails, setBankDetails] = useState("")
    const [selectedOption, setSelectedOption] = useState({value: 'bank', label: 'bank'});
    const [amount, setAmount] = useState("")
    const dispatch = useDispatch()
    const userFromRedux = useSelector(user)

    const submitWithdrawRequest = async () => {
        if(withdrawalLoading) return;
        if(!bankDetails._id){
            toast.error("please add bank details")
            return;
        }
        setWithdrawalLoading(true)
        if(!(amount > 100 )|| userFromRedux?.user?.wallet?.wallet_balance < amount){
            toast.error("enter amount more than 100 & below earnings ")
            setWithdrawalLoading(false)
            return;
        }
        const res = await raiseAwithdrawRequest({
            type:selectedOption.value,
            amount:parseFloat(amount),
            accounts:bankDetails._id
        })
        if(res.status == true){
            toast.success("withdrawal request raised successfully")
            dispatch(checkUserLoggedIn())
            setWithdrawalLoading(false)
        }
        else{
            toast.error("withdrawal request not successful")
            setWithdrawalLoading(false)
        }
        
    }

    return(
 <WithDrawWrapper>
     <Label>
                          Enter Amount
    </Label>
      <TextInput
           placeholder="XXXXXXX"
           value={amount}
            onChange={(e)=>{setAmount(e.target.value)}}
        ></TextInput>
    <ButtonWithDraw>
        Withdraw Money
    </ButtonWithDraw>
 </WithDrawWrapper>
    )
}

export default WithDrawUi;