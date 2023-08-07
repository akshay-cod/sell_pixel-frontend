import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { PostContainer, PostDesc, PostDescTitle, PostImage, PostTitle, SinglePost, TextWrapper } from "./post.styles";
import { useNavigate } from "react-router-dom";

const Posts = ({post, loading}) => {
    const navigate = useNavigate(); 

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
                        <SinglePost onClick={() => navigate(`/post/${i?._id}`)}>
                <PostImage src={i.banner_img}/>
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
    )
}

export default Posts;