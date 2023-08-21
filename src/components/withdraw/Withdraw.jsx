import { useEffect, useState } from "react";
import { Label, PendingStatus, SaveButton, TextInput, WithDrawWrapper } from "./widthdraw.styles";
import { getKycDetails, postKycDetails, updateKycDetails } from "../../api/kyc/kyc-requests";
import UploadBlock from "../common/upload/UploadBlock";
import { getBankDetails } from "../../api/bank/bank-requests";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoggedIn, user } from "../../store/feature/auth";
import Validate from 'max-validator';
import { toast } from "react-toastify";
import SimpleLoader from "../common/loaders/SimpleLoader";
import { raiseAwithdrawRequest } from "../../api/withdraw/withdraw-request";
const validationSchema =  {
    documentImage:'required|string|min:3|max:500',
    documentNumber:'required|string|min:5|max:12'
}

const WithDraw = ({setBankModal,setWithdrawModal}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [kycBtnLoading,setKyvButtonLoading] = useState(false);
    const [kycUpdateBtnLoading, setKycUpdateBtnLoading] = useState(false)
    const userFromRedux = useSelector(user)
    const [kycDetails, setkycDetails] = useState("");
    const [documentImage,setDocumentImage] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [bankDetails, setBankDetails] = useState("")
    const [selectedOption, setSelectedOption] = useState({value: 'bank', label: 'bank'});
    const [withdrawalLoading, setWithdrawalLoading] = useState(false);
    const [amount, setAmount] = useState(0)

    useEffect(()=>{
        fetchKycDetails();
       
    },[])

    useEffect(()=>{
        if(kycDetails?.status == "verified"){
            fetchBankdetails();
         }
    },[kycDetails])

    const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

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

    const fetchKycDetails = async () => {
        setLoading(true)
        const res = await getKycDetails();
        if(res?.kyc){
            setkycDetails(res?.kyc)
            setDocumentImage([{url:res?.kyc.document_image}])
            setDocumentNumber(res?.kyc?.document_number)
            setLoading(false)
            if(res?.kyc?.status == "verified"){
                dispatch(checkUserLoggedIn())
            }
        }
        else
        {
            setLoading(false)
        }
    }

    const removeDocumentImage = async () => {
        setDocumentImage("")
    }

    const SubmitKycDetails = async () => {
        if(kycBtnLoading){
            return;
        }
        setKyvButtonLoading(true)
        const dataToSend = {
            documentImage:documentImage[0]?.url,
            documentNumber:documentNumber
        }
        const results = Validate.validate(dataToSend, validationSchema)
        //console.log(results)
        if(results?.hasError){
            toast.error(Object.values(results?.errors)[0][0])
             setKyvButtonLoading(false)
            return;
        }
        const res = await postKycDetails(dataToSend)
        await fetchKycDetails()
        setKyvButtonLoading(false)
        toast.success("submitted your kyc details succussfully")
    }

    const submitUpdatekycDetails = async () => {
        if(kycUpdateBtnLoading){
            return;
        }
        setKycUpdateBtnLoading(true)
        const dataToSend = {
            documentImage:documentImage[0]?.url,
            documentNumber:documentNumber
        }
        const results = Validate.validate(dataToSend, validationSchema)
        //console.log(results)
        if(results?.hasError){
            toast.error(Object.values(results?.errors)[0][0])
            setKycUpdateBtnLoading(false)
            return;
        }
        const res = await updateKycDetails(dataToSend)
        await fetchKycDetails()
        setKycUpdateBtnLoading(false)
        toast.success("updated your kyc details succussfully")
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
            setWithdrawModal(false)
            setWithdrawalLoading(false)
        }
        else{
            toast.error("withdrawal request not successful")
            setWithdrawalLoading(false)
        }
        
    }

    if(loading){
        return(
            <div style={{minHeight:300}}>
                    <SimpleLoader/>
            </div>
            
        )
    }

    return(
       <WithDrawWrapper>
                
                {
                    kycDetails == "" ?
                    <div>
                            <div>
                            {documentImage ? 
                            <div>
                              <span style={{float:"right", cursor:"pointer"}} onClick={removeDocumentImage}>X</span>  
                                 <img
                                style={{width:"100%",height:200,objectFit:"contain"}}
                                src={documentImage[0]?.url}
                             />
                             </div>
                            : <UploadBlock
                                 url={documentImage}
                                 setUrl={setDocumentImage}
                                 accept="image/jpeg"
                                 label="document Image"
                                /> }
                            </div>
                            <div>
                                <Label>
                                    Document Number
                                </Label>
                                <TextInput
                                placeholder="enter document number PAN/ADHAR"
                                 value={documentNumber}
                                 onChange={(e)=>{setDocumentNumber(e.target.value)}}
                                ></TextInput>
                            </div>
                            <div>
                               {
                                kycBtnLoading ?
                                <div style={{display:"flex", justifyContent:"center"}}>
                                <SimpleLoader black={true}/>
                                </div>
                                :
                                <SaveButton onClick={SubmitKycDetails}>
                                    save
                                </SaveButton>
                               } 
                            </div>
                    </div>
                    :
                    kycDetails?.status == "verified"
                    ?
                    <div>
                        <Label>
                            Earnings : ₹{userFromRedux?.user?.wallet?.wallet_balance.toLocaleString()}
                        </Label>
                        <Label>
                          Amount
                         </Label>
                         <TextInput
                                placeholder="Enter amount to withdraw"
                                 value={amount}
                                 onChange={(e)=>{setAmount(e.target.value)}}
                          ></TextInput>
                          <div style={{marginBottom:20,marginTop:20}}>
                         {bankDetails ?
                                <Select
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
                              />
                            :
                            <SaveButton 
                             onClick={()=>{
                                setBankModal(true)
                                setWithdrawModal(false)
                            }}
                            style={{textAlign:"center"}}
                            >
                                Add bank details
                             </SaveButton>
                         } 
                          </div>
                          {
                            withdrawalLoading ?
                            <div style={{display:"flex", justifyContent:"center"}}>
                            <SimpleLoader black={true}/>
                            </div>
                            :
                            <SaveButton onClick={submitWithdrawRequest}
                            style={{background:!bankDetails ? "grey" : ""}}
                            >
                                    Request Withdrawal
                                </SaveButton>
                          }
                           
                    </div>
                    :   kycDetails?.status == "pending" ?
                    <div>
                         <div>
                           <PendingStatus>
                             verfication is pending
                            </PendingStatus> 
                         </div>
                         {documentImage ? 
                            <div>
                              <span style={{float:"right", cursor:"pointer"}} onClick={removeDocumentImage}>X</span>  
                                 <img
                                style={{width:"100%",height:200,objectFit:"contain"}}
                                src={documentImage[0]?.url}
                             />
                             </div>
                            : <UploadBlock
                                 url={documentImage}
                                 setUrl={setDocumentImage}
                                 accept="image/jpeg"
                                 label="document Image"
                                /> }

                            <div>
                                <Label>
                                    Document Number
                                </Label>
                                <TextInput
                                placeholder="enter document number PAN/ADHAR"
                                 value={documentNumber}
                                 onChange={(e)=>{setDocumentNumber(e.target.value)}}
                                ></TextInput>
                            </div>
                            <div>
                                {
                                    kycUpdateBtnLoading ?
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                    <SimpleLoader black={true}/>
                                    </div>
                                    :
                                    <SaveButton onClick={submitUpdatekycDetails}>
                                    update
                                    </SaveButton>
                                }
                                
                            </div>
                        
                    </div>
                    :
                    <div>
                        you are blocked
                    </div>
                
                }
       </WithDrawWrapper>
    )
}

export default WithDraw;