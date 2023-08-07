import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PostContainer, PostDesc, PostDescTitle, PostImage, PostTitle, SinglePost, TextWrapper } from "./post.styles";
import { useNavigate } from "react-router-dom";
import { removeACreation } from "../../../api/creations/creations-requests";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri"

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
                { creator?.is_owner ? <div onClick={(e)=>{
                        OnRemoveCreation(i?._id)
                       }}
                       style={{display:"flex", justifyContent:"end",paddingRight:5}}
                       >
                            <RiDeleteBin5Line/>
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