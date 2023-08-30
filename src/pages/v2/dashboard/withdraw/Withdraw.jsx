import { toast } from "react-toastify";
import { raiseAwithdrawRequest } from "../../../../api/withdraw/withdraw-request";
import { ButtonWithDraw, Label, TextInput, WithDrawWrapper } from "./withdraw.styles";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoggedIn, user } from "../../../../store/feature/auth";
import { useState } from "react";
import Select  from "react-select";
import { getKycDetails } from "../../../../api/kyc/kyc-requests";
import { useEffect } from "react";
import { getBankDetails } from "../../../../api/bank/bank-requests";

const WithDrawUi = ({openBankModal, openWithDrawModal}) =>{
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);
    const [bankDetails, setBankDetails] = useState("")
    const [selectedOption, setSelectedOption] = useState({value: 'bank', label: 'bank'});
    const [amount, setAmount] = useState("")
    
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const userFromRedux = useSelector(user)

    const withDrawCheck = () => {
        if(!userFromRedux?.user?.is_verified_user){
            openWithDrawModal()
            toast.error("Withdrawal process starts after Finscre approves. Please contact support@finscre.com for assistance")
            return;
        }
        else{
            submitWithdrawRequest()
        }
    }

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

    const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

    useEffect(()=>{
      
            fetchBankdetails();
         
    },[])

    const fetchBankdetails = async () => {
        try{
            setLoading(true)
            const res = await getBankDetails()
            if(res?.bankDetails)
            {
               setBankDetails(res.bankDetails)
               setLoading(false)
            }
            setLoading(false)
        }
        catch(err){
            setLoading(false)
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
         <div style={{margin:10}}>{bankDetails ?
                                <Select
                                styles={{
                                    color: 'hsl(10, 40%, 40%)',
                                    menuList: styles => ({
                                        ...styles,
                                        background: 'rgb(43, 43, 43)',
                                        color:"black"
                                      }),
                                      option: (styles, { isFocused, isSelected, isDisabled }) => ({
                                        ...styles,
                                        background: isFocused
                                          ? '#3B3B3B'
                                          : isSelected
                                            ? '#3B3B3B'
                                            : undefined,
                                        zIndex: 1,
                                        color: isDisabled
                                        ? '#ccc'
                                        : isSelected ? 'white'
                                          : 'white'
                                      }),
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      background:"#3B3B3B",
                                      color:"#3B3B3B",
                                      borderColor: state.isFocused ? 'grey' : 'grey',
                                    }),
                                    singleValue: (styles, { data }) => ({ ...styles, color:"white" })
                                  }}
                                value={selectedOption}
                                onChange={handleSelect}
                                options={[{
                                    value:"bank",
                                    label:"bank"
                               },
                               {
                                value:"upi",
                                label:"upi"
                               }
                            ]}
                              />:""}</div>
   <div style={{display:"flex"}}>
   <ButtonWithDraw style={{flexBasis:"48%"}} onClick={()=>{withDrawCheck()}}>
        Withdraw Money
    </ButtonWithDraw>
    <ButtonWithDraw  onClick={()=>{openBankModal()}} style={{background:"rgb(66, 184, 126)",flexBasis:"48%"}}>
        Add Bank Details
    </ButtonWithDraw>
   </div>
   
 </WithDrawWrapper>
    )
}

export default WithDrawUi;