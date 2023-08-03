import styled from "styled-components";

export const PurchaseWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding-right:20px;
    padding-left:40px;
    padding-top:20px;
    padding-bottom:20px;
`

export const ProfileImage = styled.img`
width: 80px;
border-radius: 50%;
object-fit: contain;
height:80px;
`

export const Name = styled.div`
font-size:18px;
font-weight:bold;
color:black;
padding:10px;
`

export const GreenBtn = styled.div`
padding:12px 35px;
background:green;
border-radius:10px;
font-weight:bold;
cursor:pointer;
`