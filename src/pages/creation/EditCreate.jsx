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

const validationSchema =  {
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

    const [buttonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();

    console.log(banImg,"banImg",url);

    useEffect(()=>{
        setBannerImg([{url:state?.bannerImage}])
        setType(state?.type);
        setPrice(state?.price)
        setDesc(state?.description);
        setUrl(state?.url)
        setTitle(state?.title)
    },[])

    const onSubmitCreation = async () => {
        setButtonLoading(true)
        const dataToSend = {
            title:title,
            description:desc,
            bannerImg:banImg[0]?.url,
            price:parseInt(price),
            type:"image",
            files:url
        }
        const result = Validate.validate(
          dataToSend,
          validationSchema
        )
        console.log(result,"results")
    
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
           navigate(`/post/${creationId}`)
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
            console.log(url)
            let temp_url = url
            temp_url.splice(index, 1)
           console.log(temp_url,"new")
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
                                                    {console.log(data.url.split('/')[3])}
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

                                <Label>
                                    Price
                                </Label>
                                <TextInput placeholder="Enter your price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>

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