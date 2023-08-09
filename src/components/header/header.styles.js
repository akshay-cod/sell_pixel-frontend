import styled from "styled-components";
import { colors } from "../../configs/theme/color";
import { padding } from "../../configs/theme/padding";
import { borders } from "../../configs/theme/borders";

export const HeaderLeft = styled.div`
  
`;

export const HeaderRight = styled.div`
  
`;

export const LanguageWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  background:${colors.secondary};
  padding:${padding.primary};
  border-radius:${borders.primary};
  color:white;
`;


export const LanguageLeftSide = styled.div`

`

export const LanguageRightSide = styled.div`

`

export const FreeMoneyWrapper = styled.div`
 display:flex;
 justify-content:space-between;
 background:linear-gradient(285.39deg,#ffb800 -4.36%,#fff173 115.87%);
 padding:${padding.secondary};
 border-radius:${padding.primary};
 font-size:12px
`

export const FreeMoneyRightSide = styled.div`
`

export const FreeMoneyLeftSide = styled.div`
 color:${colors.primary};
`

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.div`
  display:flex;
  justify-content:space-between;
  background:${colors.primary};
  padding-top:15px;
  padding-bottom:15px;
  padding-left:15px;
  padding-right:15px
`;

export const WrapperStickyHeader = styled.div`
position: sticky;
top: 0;
 z-index: 99;
 background: #2B2B2B;
 display:flex;
 justify-content:space-between;
 align-items:center;
 padding:10px 55px;
 @media (max-width: 700px) {
  padding-left:10%;
  padding-right:10%;
}
@media (max-width: 500px) {
  padding-left:5%;
  padding-right:5%
}
`

export const StickyHeaderLeft = styled.div`
display:flex;
`
export const MenuItem = styled.div`
color:white;
padding: 5px 6px;
margin:10px;
font-size:12px;
font-weight:bold;
cursor:pointer;
`

export const StickyHeaderRight = styled.div`
display:flex;
`

export const LoginBtn = styled.div`
background:#A259FF;
padding: 10px 30px;
border-radius: 10px;
font-size:12px;
font-weight:bold;
color:white;

`

export const LogOutBtn = styled.div`
background:#FF7262;
padding: 10px 30px;
border-radius: 10px;
font-size:12px;
font-weight:bold;
color:white;
text-align: center;
`

export const RegistorBtn = styled.div`
background:#A259FF;
padding: 10px 30px;
border-radius: 10px;
font-size:12px;
font-weight:bold;
color:white;
margin:10px;
`

export const WithDrawBtn = styled.div`
background:#A259FF;
padding: 10px 30px;
border-radius: 10px;
font-size:12px;
font-weight:bold;
color:white;
margin:10px;
text-align:center;
`