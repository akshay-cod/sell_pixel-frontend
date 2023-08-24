import styled from "styled-components";
import { colors, colorsV2 } from "../../configs/theme/color";
import { padding } from "../../configs/theme/padding";


export const FooterWrapper = styled.div`
  background:rgb(26 26 26);
  color:white;
  padding:${padding.tertiary}
`

export const SeparatorWrapper = styled.div`
 display:flex;
 align-items:center;
 padding:${padding.tertiary}
`

export const SepratorLeft = styled.div`
flex-basis:60px;
margin-right:${padding.secondary}
`

export const SeperatorLeftImage = styled.img`
width:40px;
height:35px;
object-fit:cover
`

export const SeperatorRight = styled.div`
flex-basis:100%;
`

export const SeperatorRightLine = styled.div`
background:${colorsV2.divider.dark};
width:100%;
height:1px;
`

export const LinksWrapper = styled.div`
  margin-top:${padding.secondary};
  display:flex;
  justify-content:space-between;
`

export const LinksLeftWrapper = styled.div`
 display:flex;
`

export const LinksLeftBlockOne = styled.div`
 margin-right:20px
` 

export const SupportHeader = styled.div`
font-size:12px;
font-weight:600;
`

export const SupportDescription = styled.div`
font-size:10px;
font-weight:400;
margin-top:8px;
color:${colors.secondary};
letter-spacing: .2px;
line-height:14px;
`

export const SupportPhoneNumberWrapper = styled.div`
margin-top:28px;
font-size:10px;
font-weight:600;
line-height:12px;
`

export const CallImage = styled.img`
`

export const LinksLeftBlockTwo = styled.div`
` 

export const LeftBlockTwoWrapper = styled.div`
margin-right:20px;
`

export const TwoWrapperHeading = styled.div`
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: .4px;
    text-transform: uppercase;
    color: ${colors.secondary};
    margin-bottom: 40px;
`

export const TwoWrapperLists = styled.div`
    display:flex;
`

export const TwoWrapperLeftList = styled.div`
margin-right:20px;
`

export const TwoWrapperRightList = styled.div`
margin-right:20px;
`

export const TwoWrapperSingleListLeft = styled.div`
font-size: 13px;
line-height: 16px;
color:${colors.secondary};
margin-bottom:5px;
`

export const TwoWrapperSingleListRight = styled.div`
font-size: 13px;
line-height: 16px;
color:white;
margin-bottom:5px;
`

export const LinksLeftBlockThree = styled.div`
` 

export const LinksLeftBlockFour = styled.div`
` 

export const LinksRightWrapper = styled.div`
`

export const Seperator = styled.div`
background:${colorsV2.divider.dark};
width:100%;
height:.6px;
margin-top:${padding.tertiary};
margin-bottom:${padding.tertiary}
`

export const CopyRightText = styled.div`
 font-size:9px;
 color:${colors.secondary}
`