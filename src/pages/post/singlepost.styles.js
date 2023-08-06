import styled from "styled-components";

export const SinglePostWrapper = styled.div`
padding-left: 80px;
max-width:40%;
@media (max-width: 768px) {
    padding-left:40px;
    max-width:80%;
  }
  @media (max-width: 500px) {
    padding-left:10px;
    padding-right:10px;
    max-width:100%;
  }
`

export const DescHeading = styled.div`
 color:#858584;
 margin-top:20px;
 font-size:14px;
`
export const Descr = styled.div`
margin-top:4px;
font-size:12px;
font-weight:200;
white-space: pre-line; 
`;

export const TitleHeading = styled.div`
 font-size:40px;
 font-weight:bold;
`

export const TimeStamp = styled.div`
color:#858584;
font-size:16px;
`

export const AvatarSmall = styled.img`
width: 10px;
border-radius: 50%;
height: 10px;

`;

export const Createdby = styled.div`
font-size:12px;
margin-top:3px;
`

export const Space = styled.div`
width:100%;
height:20px;
`