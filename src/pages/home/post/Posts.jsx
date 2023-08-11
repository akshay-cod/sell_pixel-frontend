import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PostContainer, PostDesc, PostDescTitle, PostImage, PostTitle, SinglePost, TextWrapper } from "./post.styles";
import { useNavigate } from "react-router-dom";
import { removeACreation } from "../../../api/creations/creations-requests";
import { toast } from "react-toastify";
import { RiDeleteBin5Line, RiEdgeLine, RiEdit2Line } from "react-icons/ri"
import { useState } from "react";
import Modal from "../../../components/common/modal/Modal";
import { SubmitBtn } from "../../creation/create.styles";
import SimpleLoader from "../../../components/common/loaders/SimpleLoader";

const Posts = ({post, loading, creator}) => {
    const navigate = useNavigate(); 
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [id, setId] = useState("")
    const OnRemoveCreation = async (id) => {
        setId(id)
       setDeleteModal(true)
    }

    const requestforDelete = async () => {
        setDeleteLoading(true)
       const res = await removeACreation(id)
        if(res){
            setDeleteLoading(false)
            toast.success("deleted creation succesfully")
            window.location.reload()
        }
        setDeleteLoading(false)
    }

    const DelteCompo = (
        <div 
          style={{padding:20,color:"black",textAlign:"center"}}
        >
            <div>
                Are you sure you want to delete ?
            </div>
            <div>

           {
            deleteLoading ? <div style={{display:"flex", justifyContent:"center"}}>
                <SimpleLoader black={true} />
            </div> : <SubmitBtn onClick={requestforDelete} style={{color:"white",background:"red",margin:"15px 0px"}}>Yes</SubmitBtn>
           } 
            <SubmitBtn onClick={()=>{setDeleteModal(false)}} style={{color:"white"}}>No</SubmitBtn>
                
            </div>
        </div>
    )


    return(
        <>
        <PostContainer>
            { loading == true && 
            [1,2,3,4,5,6,7,8].map((i)=>{
                return(
                    <SinglePost>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">   
                    <Skeleton  height={"100%"} /> 
                    </SkeletonTheme>
               </SinglePost>
                )
            })
            }
            {
              loading == false && post.length>0 && post?.map((i,index)=>{
                    return(
                        <SinglePost >
                <PostImage src={i.banner_img} onClick={() => navigate(`/post/${i?._id}`)}/>
               
                { creator?.is_owner ? <div 
                       style={{display:"flex", justifyContent:"end",paddingRight:5}}
                       >
                            <RiDeleteBin5Line
                            onClick={(e)=>{
                                OnRemoveCreation(i?._id)
                               }}
                            />

                            <div onClick={(e)=>{
                        navigate(`/creations/edit/${i?._id}`,{state:{
                            bannerImage:i?.banner_img,
                            type:i?.type,
                            url:i?.files,
                            price:i?.price,
                            description:i?.description,
                            title:i?.title,
                        }})
                       }}
                       style={{marginLeft:5,display:"flex", justifyContent:"end",paddingRight:5}}
                       >
                            <RiEdit2Line/>
                        </div>
                        </div> : ""
                }
                <TextWrapper >
                    <PostTitle>
                       {i?.title}
                    </PostTitle>   
                    <PostDescTitle>
                        description
                    </PostDescTitle>
                    <PostDesc>
                       {i?.description}
                    </PostDesc>
                </TextWrapper>
            </SinglePost>
                    )
                })
            }
            
        </PostContainer>
        <div >
        <Modal
          auth={true}
          component={DelteCompo}
          isVisible={deleteModal}
          setVisible={setDeleteModal}
        />
        </div>
        
        </>
    )
}

export default Posts;