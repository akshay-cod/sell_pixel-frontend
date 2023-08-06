import { useEffect, useState } from "react";
import { BankWrapper, Label, SaveButton, TextInput } from "./bank-details.styles";
import { getBankDetails, saveABankDetails } from "../../api/bank/bank-requests";
import { toast } from "react-toastify";

const BankDetails = () => {
    const [accountNumber, setAccountNumber] = useState("");
    const [accountIfsc, setAccountIfsc] = useState("");
    const [accounthoderName, setAccountHolderName] = useState("");
    const [upiId, setUpiId] = useState("");

    useEffect(()=>{
        fetchBankdetails()
    },[])

    const submitBankDetails = async ()=>{
      try{
        const dataTosend = {
            upi:[{upi_id:upiId}],
            accountDetails:[{
                account_holder_name:accounthoderName,
                account_number:accountNumber,
                account_ifsc:accountIfsc
            }]
        }
        const res = await saveABankDetails(dataTosend)
        toast.success("success")
      } 
      catch(err){

      } 
    }

    const fetchBankdetails = async () => {
        try{
            const res = await getBankDetails()
            if(res?.bankDetails)
            {
                setAccountHolderName(res.bankDetails?.bank[0]?.account_holder_name)
                setAccountIfsc(res.bankDetails?.bank[0]?.account_ifsc)
                setAccountNumber(res.bankDetails?.bank[0]?.account_number)
                setUpiId(res.bankDetails?.upi[0]?.upi_id)
            }

        }
        catch(err){

        }
    }

    return(
        <BankWrapper>
            <div>
                <Label>
                    UPI-id
                </Label>
                <TextInput value={upiId} onChange={(e)=>{setUpiId(e.target.value)}}/>
            </div>

            <div>
                <Label>
                    Account Holder Name
                </Label>
                <TextInput value={accounthoderName} onChange={(e)=>{setAccountHolderName(e.target.value)}}/>
            </div>
            <div>
                <Label>
                    Account Number
                </Label>
                <TextInput value={accountNumber} onChange={(e)=>{setAccountNumber(e.target.value)}}/>
            </div>
           
            <div>
                <Label>
                    Account IFSC
                </Label>
                <TextInput value={accountIfsc} onChange={(e)=>{setAccountIfsc(e.target.value)}}/>
            </div>
            <div>
            <SaveButton onClick={submitBankDetails}>
                                    save
                                </SaveButton>
            </div>
        </BankWrapper>
    )
}

export default BankDetails;