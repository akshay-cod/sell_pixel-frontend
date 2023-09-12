import styled from "styled-components";
import { colorsV2 } from "../../../configs/theme/color";
import { typography } from "../../../configs/theme/typography";

export const PurchasesWrapper = styled.div`
display:flex;
justify-content:flex-start;
margin:${(props)=> props.margin ? props.margin : "20px 30%"};
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
padding:14px;
margin-bottom:15px;
display:flex;
justify-content:space-between;
cursor:pointer;
align-items: center;
&:hover{
  background:${colorsV2.block.dark};
}
`

export const CardLeftWrapper = styled.div``

export const CardRightWrapper = styled.div``

export const StatusImageWrapper = styled.div`
display:flex;
align-items:center;
`
export const PurchasedItemTitle = styled.div`
font-size:${typography.title.fxs.fontSize}px;
margin-bottom:6px;
`

export const PurchasedItemTime = styled.div`
font-size:${typography.sub.fxs.fontSize}px;
color:${colorsV2.text.placeholder};
`

export const ImageStatus = styled.div`
padding:10px;
border:1px solid ${colorsV2.text.placeholder};
border-radius:10px;
margin-right:10px;
`

export const TextWrap = styled.div``

export const PriceHolder = styled.div`
font-size:${typography.title.fs.fontSize}px;
font-family:GraphikSemiBold;
`


export const TitlePriceWrapper = styled.div`
 display:flex;
 justify-content:space-between;
`
export const StatusSuccess = styled.div`
font-size:14px;
margin-top:4px;
border:1px solid green;
padding:4px 10px;
text-align:center;
border-radius:10px;
`

export const StatusProcessing = styled.div`
font-size:14px;
margin-top:4px;
border:1px solid orange;
padding:4px 10px;
text-align:center;
border-radius:10px;
`

export const StatusFailure = styled.div`
font-size:14px;
margin-top:4px;
border:1px solid red;
padding:4px 10px;
text-align:center;
border-radius:10px;
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

export const CommissionHolder = styled.div`
 margin-top:20px;
 display:flex;
 justify-content:space-between;
 font-size:12px;
font-weight:bold;
`