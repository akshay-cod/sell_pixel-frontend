import styled from "styled-components";
import { typography } from "../../../configs/theme/typography";
import { colorsV2 } from "../../../configs/theme/color";

export const DashboardWrapper = styled.div`
 display:flex;
 margin:2% 7%;
 @media only screen and (max-width: 600px){
	flex-direction:column;
}
`

export const BalanceDetailsWrapper = styled.div`
`

export const BalanceDetailsLeft = styled.div`
display:flex;
@media only screen and (max-width: 600px){
	flex-direction:column;
}
`

export const BalanceDetailsInsideWrapper = styled.div`
background:hsl(150.51deg 47.2% 49.02%);
flex-basis:50%;
margin:5px;
border-radius:5px;
display:flex;
padding:15px;
justify-content: center;
align-items:center;
`

export const BalanceDetailsInsideLeft = styled.div``

export const IconWrapper = styled.div`
background:${colorsV2.block.dark};
padding:10px;
border-radius:15px;
margin-right:10px;

`

export const BalanceDetailsInsideRight = styled.div``

export const BalanceTitle = styled.div`
font-size:${typography.body.fs.fontSize}px;
font-family:GraphikSemiBold;
margin-bottom:2px;
color:${colorsV2.block.dark};
`

export const BalnceMoney = styled.div`
font-size:${typography.title.fxxl.fontSize}px;
font-family:GraphikBold;
color:${colorsV2.block.dark};
`

export const GraphWrapper = styled.div`
background:${colorsV2.block.medium};
border-radius:10px;
padding:10px;
margin-top:10px;
`

export const BalanceDetailsRight = styled.div``

export const DashboardLeftWrapper = styled.div`flex-basis:70%;`

export const DashboardRightWrapper = styled.div`
flex-basis:40%;
margin-left:20px;
@media (max-width: 700px) {
	margin-left:0px;
	margin-top:20px;
  }
`

export const CardWithDrawalWrapper = styled.div`
background:${colorsV2.block.medium};
border-radius:10px;
height:200px;
width:100%;
`
export const ListingTransactions = styled.div`
background:${colorsV2.block.medium};
border-radius:10px;
width:100%;
margin-top:15px;
padding-top:1px;
min-height:350px;
height:810px;
overflow-y:scroll;
`
