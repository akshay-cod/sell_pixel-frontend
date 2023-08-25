import ReactPlayer from "react-player";
import UploadBlock from "../../components/common/upload/UploadBlock";
import { ButtonWrapper, FilesWrapper, Label, SubmitBtn, TextInput, Textarea,FileHolder, Wrapper, ImageFile } from "./create.styles";
import SimpleLoader from "../../components/common/loaders/SimpleLoader";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Validate from 'max-validator';
import { EditCreateAcreation } from "../../api/creations/creations-requests";
import { useEffect } from "react";
import Select from "react-select";

const itemTypes=[
    {label:"Image", value:"image"},
    {label:"Audio", value:"audio"},
    {label:"Video", value:"video"},
    {label:"Document", value:"document"},
    {label:"Any", value:"any"},
    {label:"File", value:"file"}
]


 let validationSchema =  {
    title:'required|string|min:3|max:50',
    description:'required|string|min:3|max:1000',
    bannerImg:'required|string|min:3|max:1000',
    price:'required|between:10,100000|numeric',
    type:'required|string|min:3|max:1000',
    files:"required|array|min:1"
}

const EditCreation = () => {
    const {state} = useLocation()
    const { creationId } = useParams();
    const [type,setType] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [url,setUrl] = useState([]);
    const [price, setPrice] = useState("");
    const [banImg, setBannerImg] = useState("")
    const [selectedOption, setSelectedOption] = useState({label:"Any", value:"any"});
    const [selectedOptionType, setSelectedOptionType] = useState({label:"select paid/free", value:"select"});


    const [buttonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();

    //console.log(banImg,"banImg",url);

    useEffect(()=>{
        setBannerImg([{url:state?.bannerImage}])
        setType(state?.type);
        if(state?.type){
            setSelectedOption({
                label:state.type.charAt(0).toUpperCase() + state.type.slice(1),
                value:state.type
            })
        }
        if(state?.price == 0){
            setSelectedOptionType({
                label:"Free",
                value:"free"
            }
        )
        }
        else{
            setSelectedOptionType(
                {
                    label:"Paid",
                    value:"paid"
                }
            )
        }
        setPrice(state?.price)
        setDesc(state?.description);
        setUrl(state?.url)
        setTitle(state?.title)
    },[])

    const handleSelect = (selectedOption) => {
        //console.log(selectedOption)
        setSelectedOption(selectedOption)
    }

    const handleSelectType = (selectedOption) =>{
        setSelectedOptionType(selectedOption)
    }


    const onSubmitCreation = async () => {
        setButtonLoading(true)
        const dataToSend = {
            title:title,
            description:desc,
            bannerImg:banImg[0]?.url,
            price:selectedOptionType.value == "free" ? 0 : parseInt(price),
            type:selectedOption.value,
            files:url
        }
        if(selectedOptionType.value == "free"){
            delete validationSchema.price
        }
        const result = Validate.validate(
          dataToSend,
          validationSchema
        )
        //console.log(result,"results")
    
        if(result?.hasError){
            setButtonLoading(false)
            toast.error(Object.values(result?.errors)[0][0]);
            return;
        }
           const res = await EditCreateAcreation(creationId,dataToSend);
           if(res.status === true)
           {
            setButtonLoading(false)
           toast.success("updated the creations successfully")
           navigate(`/creations/${creationId}`)
            // navigation.navigate("single-creation-view",
            // {
            //     bannerImg:`${IMAGE_URL}/public/${banImg[0].url}`,
            //     title:title,
            //     description:desc,
            //     price:price,
            //     type:type,
            //     creationId:res?.created?._id
            // })
           }
           else{
            setButtonLoading(false)
            toast.error("update creations failed")
           // setToastText("creations failed");
           }
        }
    
        const removeBannerImage = async () => {
            setBannerImg("")
        }
    
        const removeItFromList = async (index) => {
            //console.log(url)
            let temp_url = url
            temp_url.splice(index, 1)
           //console.log(temp_url,"new")
           setUrl([...temp_url])
        }

    return(
        <>
        <Wrapper>
                     {banImg ? 
                            <div>
                              <span onClick={removeBannerImage}>X</span>  
                                 <img
                                style={{width:"100%",height:200,objectFit:"cover"}}
                                src={banImg[0]?.url}
                             />
                             </div>
                            : <UploadBlock
                                 url={banImg}
                                 setUrl={setBannerImg}
                                 accept="image/jpeg"
                                 label="Banner Image"
                                /> }

<div style={{marginTop:20}}>
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
                                options={itemTypes}
                              />
                        </div>

                                <Label>
                                    Title
                                </Label>
                                <TextInput placeholder="Enter your title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                                
                                <Label>
                                    Description
                                </Label>
                                <Textarea placeholder="Enter your description" rows="8" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>

                                <Label style={{marginBottom:10}}>
                                    Files ({url?.length+"/10"})
                                </Label>
                                <div>
                               {url?.length < 10 && <UploadBlock
                                 url={url}
                                 setUrl={setUrl}
                                 id="files"
                                />}
                                </div>

                                <div>
                                {
                                url?.length > 0 ?
                                (<div>
                                    {
                                        url?.map((data,index)=>{
                                            return(
                                                <FilesWrapper >
                                                   {data?.type.startsWith("image") && <div>
                                                   <span style={{padding:10,float:"right",cursor:"pointer"}} onClick={() => removeItFromList(index)}>X</span>
                                                        <ImageFile
                                                          src={data?.url}
                                                          
                                                        />
                                                       
                                                    </div>}
                                                    {data?.type.startsWith("video") &&
                                                         <div style={{width:"100%",height:340}}>
                                                            <span style={{padding:10,float:"right",cursor:"pointer"}} onClick={() => removeItFromList(index)}>X</span>
                                                         <div style={{background:"black"}}>
                                                                 <ReactPlayer
                                                                 
                                                                 width="100%"
                                                                 height="300px"
                                                                 controls
                                                                 url={data?.url}/> 
                                                         </div>
                                                     </div>
                                                    }
                                                   
                                                   {!data?.type.startsWith("image") && !data?.type.startsWith("video") && <FileHolder >
                                                         <span>{data.url.split('/')[3]}</span> 
                                                         <span style={{cursor:"pointer"}} onClick={() => removeItFromList(index)}>X</span>
                                                    </FileHolder>}
                                                </FilesWrapper>
                                            )
                                        })
                                    }
                                </div>) : ""
                            }
                                </div>

                                <div style={{marginTop:20}}>
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
                                value={selectedOptionType}
                                onChange={handleSelectType}
                                options={[{
                                    label:"Free",
                                    value:"free"
                                },
                            {
                                label:"Paid",
                                value:"paid"
                            }]}
                              />
                        </div>

                               {selectedOptionType.value == "paid" && <><Label>
                                    Price
                                </Label>
                                <TextInput placeholder="Enter your price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/> </>}

                                <ButtonWrapper>
                {
                    buttonLoading ? (
                     <SimpleLoader/>
                    ):
                    ( <SubmitBtn onClick={onSubmitCreation}>
                        Save
                    </SubmitBtn>)
                }
               
            </ButtonWrapper>

         </Wrapper>
       
        </>
       
    )
}

export default EditCreation