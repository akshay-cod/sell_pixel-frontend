import { useEffect, useState } from "react";
import { BankWrapper, Label, SaveButton, TextInput } from "./bank-details.styles";
import { getBankDetails, saveABankDetails } from "../../api/bank/bank-requests";
import { toast } from "react-toastify";
import SimpleLoader from "../common/loaders/SimpleLoader";
import Validate from 'max-validator';
import { isValidIfsc, isValidUpi } from "../../helpers/validations";

let validationSchemaBank =  {
    account_holder_name:["required","string","min:3","max:50"],
    account_number:'required|string|min:3|max:18|numeric',
    account_ifsc:["required", "string", "min:3",
    function (value) {
                if (isValidIfsc(value)) {
                return true;
                }
                return 'Enter a valid IFSC code';
            }
        ]
}

let validationSchemaUpi =  {
    upi_id:["required","string","min:3","max:50",
    function (value) {
        if (isValidUpi(value)) {
          return true;
        }
        return 'Enter a valid upi Id';
      }],
}

const BankDetails = () => {
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountIfsc, setAccountIfsc] = useState("");
    const [accounthoderName, setAccountHolderName] = useState("");
    const [upiId, setUpiId] = useState("");

    useEffect(()=>{
        fetchBankdetails()
    },[])

    const submitBankDetails = async ()=>{
      try{
        setButtonLoading(true)
        const dataToSend = {
            upi:[{upi_id:upiId}],
            accountDetails:[{
                account_holder_name:accounthoderName,
                account_number:accountNumber,
                account_ifsc:accountIfsc
            }]
        }

        const resultUpi = Validate.validate(
            dataToSend.upi[0],
            validationSchemaUpi
          )
        
          if(resultUpi?.hasError){
            setButtonLoading(false)
            toast.error(Object.values(resultUpi?.errors)[0][0]);
            return;
        }

        const result = Validate.validate(
            dataToSend.accountDetails[0],
            validationSchemaBank
          )
          if(result?.hasError){
              setButtonLoading(false)
              toast.error(Object.values(result?.errors)[0][0]);
              return;
          }
        const res = await saveABankDetails(dataToSend)
        toast.success("success")
        setButtonLoading(false)
      } 
      catch(err){
        setButtonLoading(false)
      } 
    }

 

    const fetchBankdetails = async () => {
        try{
            setLoading(true)
            const res = await getBankDetails()
            if(res?.bankDetails)
            {
                setAccountHolderName(res.bankDetails?.bank[0]?.account_holder_name)
                setAccountIfsc(res.bankDetails?.bank[0]?.account_ifsc)
                setAccountNumber(res.bankDetails?.bank[0]?.account_number)
                setUpiId(res.bankDetails?.upi[0]?.upi_id)
                setLoading(false)
            }
            setLoading(false)

        }
        catch(err){
            setLoading(false)
        }
    }

    if(loading){
        return(
            <div style={{minHeight:300,display:"flex",paddingLeft:40, flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
                    <SimpleLoader black={true}/>
            </div>
            
        )
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
            {
                buttonLoading ?
                <div style={{
                    display:"flex",
                    justifyContent:"center"
                }}> <SimpleLoader black={true}/></div>
                 :
                 <div>
                     <SaveButton onClick={submitBankDetails}>
                         save
                    </SaveButton>
                </div>
                }
           
        </BankWrapper>
    )
}

export default BankDetails;