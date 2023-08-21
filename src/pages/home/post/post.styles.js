import styled from "styled-components";

export const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-gap: 20px 20px;
  justify-content: center;
 
`
// align-items: baseline;
export const SinglePost = styled.div`
    background:#2B2B2B;
    border-radius:12px;
    width:300px;
    height:320px;
    cursor:pointer;
`

export const PostImage = styled.img`
width:100%;
object-fit:cover;
height:200px;
border-top-left-radius:12px;
border-top-right-radius:12px;
`

export const TextWrapper = styled.div`
 padding:10px;
`

export const PostTitle = styled.div`
 font-size:18px;
 font-weight:500;
 margin-bottom:10px;
 display: -webkit-box;
 -webkit-line-clamp: 1;
 -webkit-box-orient: vertical;
 text-overflow: ellipsis;
   overflow: hidden;
`

export const PostDescTitle = styled.div`
color: rgb(133, 133, 132);
font-size: 10px;
margin-bottom:2px;
`

export const PostDesc = styled.div`
font-size: 12px;
font-weight: 200;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
  overflow: hidden;
`