import { useEffect, useState } from "react";
import { Label, PendingStatus, SaveButton, TextInput, WithDrawWrapper } from "./widthdraw.styles";
import { getKycDetails, postKycDetails, updateKycDetails } from "../../api/kyc/kyc-requests";
import UploadBlock from "../common/upload/UploadBlock";
import { getBankDetails } from "../../api/bank/bank-requests";
import Select from "react-select";
import { useSelector } from "react-redux";
import { user } from "../../store/feature/auth";
import Validate from 'max-validator';
import { toast } from "react-toastify";
import SimpleLoader from "../common/loaders/SimpleLoader";
const validationSchema =  {
    documentImage:'required|string|min:3|max:500',
    documentNumber:'required|string|min:5|max:12'
}

const WithDraw = ({setBankModal,setWithdrawModal}) => {

    const [loading, setLoading] = useState(true);
    const [kycBtnLoading,setKyvButtonLoading] = useState(false);
    const [kycUpdateBtnLoading, setKycUpdateBtnLoading] = useState(false)
    const userFromRedux = useSelector(user)
    const [kycDetails, setkycDetails] = useState("");
    const [documentImage,setDocumentImage] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [bankDetails, setBankDetails] = useState("")
    const [selectedOption, setSelectedOption] = useState({value: 'bank', label: 'bank'});

    const [amount, setAmount] = useState(0)

    useEffect(()=>{
        fetchKycDetails();
        if(kycDetails?.status == "verified"){
           fetchBankdetails();
        }
    },[])

    const handleSelect = (selectedOption) => {
        console.log(selectedOption)
        setSelectedOption(selectedOption)
    }

    const fetchBankdetails = async () => {
        try{
            const res = await getBankDetails()
            if(res?.bankDetails)
            {
               setBankDetails(res.bankDetails)
            }

        }
        catch(err){

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
        console.log(results)
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
        console.log(results)
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
if(loading){
    <SimpleLoader black={true}/>
}

    return(
       <WithDrawWrapper>
                
                {
                    kycDetails == "" ?
                    <div>
                            <div>
                            {documentImage ? 
                            <div>
                              <span onClick={removeDocumentImage}>X</span>  
                                 <img
                                style={{width:"100%",height:200,objectFit:"cover"}}
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
                                placeholder="enter amount to withdraw"
                                 value={amount}
                                 onChange={(e)=>{amount(e.target.value)}}
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
                            <div 
                             onClick={()=>{
                                setBankModal(true)
                                setWithdrawModal(false)
                            }}
                            >
                                add bank details
                             </div>
                         } 
                          </div>
                           <SaveButton onClick={()=>{}}>
                                    Request Withdrawal
                                </SaveButton>
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
                                style={{width:"100%",height:200,objectFit:"cover"}}
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