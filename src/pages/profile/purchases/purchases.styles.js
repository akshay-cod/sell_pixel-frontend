import styled from "styled-components";

export const PurchasesWrapper = styled.div`
display:flex;
justify-content:flex-start;
margin:20px 30%;
flex-direction:column;
@media (max-width: 700px) {
  margin:10%
}
@media (max-width: 500px) {
  margin:5%
}
min-height:80vh;
`


export const CardWrapper = styled.div`
  border-radius:10px;
  padding:34px;
  background:rgb(43, 43, 43);
  margin-bottom:15px;
`

export const TitlePriceWrapper = styled.div`
 display:flex;
 justify-content:space-between;
`

export const TitleContainer = styled.div`
 font-size:14px;
 font-weight:bold;
`

export const PriceContainer = styled.div`
font-size:14px;
font-weight:bold;
`

export const CreatorPurchaseTimeWrapper = styled.div`
 display:flex;
 margin-top:10px;
 margin-bottom:10px;
 `

 export const CreatorName = styled.div`
  font-size:10px;
  font-weight:bold;
  margin-right:15px;
  cursor:pointer;
 `

 export const TimeWrapper = styled.div`
 font-size:10px;
 font-weight:bold;
 `

 export const ButtonWrapper = styled.div`
display:flex;
align-items:center;
margin-top:20px;
`

export const PreviwBtn = styled.div`
border:1px solid green;
padding:8px 24px;
border-radius:10px;
cursor:pointer;
font-size:12px;
font-weight:bold;
`

export const LoadMoreWrapper = styled.div`
 display:flex;
 justify-content:center;
`

export const LoadMoreBtn = styled.div`
padding:10px 25px;
background:rgb(43, 43, 43);
border-radius:10px;
font-weight:bold;
font-size:14px;
cursor:pointer;
width:200px;
margin-top:20px;
text-align:center;
`