import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PostContainer, PostDesc, PostDescTitle, PostImage, PostTitle, SinglePost, TextWrapper } from "./post.styles";
import { useNavigate } from "react-router-dom";
import { removeACreation } from "../../../api/creations/creations-requests";
import { toast } from "react-toastify";
import { RiDeleteBin5Line, RiEdgeLine, RiEdit2Line } from "react-icons/ri"

const Posts = ({post, loading, creator}) => {
    const navigate = useNavigate(); 

    const OnRemoveCreation = async (id) => {
        const res = await removeACreation(id)
        if(res){
            toast.success("deleted craetion succesfully")
        }
    }

    return(
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
                <PostImage src={i.banner_img}/>
                {console.log(creator,"creatir")}
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
                            title:i?.title
                        }})
                       }}
                       style={{marginLeft:5,display:"flex", justifyContent:"end",paddingRight:5}}
                       >
                            <RiEdit2Line/>
                        </div>
                        </div> : ""
                }
                <TextWrapper onClick={() => navigate(`/post/${i?._id}`)}>
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
    )
}

export default Posts;