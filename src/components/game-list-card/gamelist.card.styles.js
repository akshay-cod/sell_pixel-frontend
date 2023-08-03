import styled from "styled-components";
import { padding } from "../../configs/theme/padding";
import { borders } from "../../configs/theme/borders";
import { colors } from "../../configs/theme/color";

export const Wrapper = styled.div`
padding:15px;
background:${colors.primary};
`

export const GameListCardWrapper = styled.div`
 padding:20px;
 background-image:linear-gradient(110deg, rgb(30, 40, 63), rgb(20 27 46) 100%);
 border-radius:15px;
 `

export const GameListHeading = styled.div`
 color:white;
 font-size:25px;
 padding-bottom:20px;
 font-weight:bold;
`

export const GameListInnerCardWrapper = styled.div`
 display:flex
`

export const SingleGameCardImage = styled.img`
margin-right:20px;
border-radius:${borders.secondary};
height:100px;
width:120px;
object-fit:cover;
`
