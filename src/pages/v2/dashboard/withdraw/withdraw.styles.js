import styled from "styled-components";
import { colorsV2 } from "../../../../configs/theme/color";
import { typography } from "../../../../configs/theme/typography";

export const WithDrawWrapper = styled.div`
    word-wrap: break-word;
    color:black;
    padding:20px;
    
`;

export const ButtonsHolder = styled.div`
display:flex;
@media (max-width: 700px) {
	flex-direction:column;
  }
`

export const ButtonWithDraw = styled.div`
cursor:pointer;
 background:hsl(43.09deg 100% 64.51%);
 margin:10px;
 text-align:center;
 padding:16px;
 color:${colorsV2.block.dark};
 font-size:13px;
 font-family:GraphikBold;
 border-radius:10px;
`
export const Label = styled.div`
font-size:14px;
margin-top:20px;
text-align:left;
color:${colorsV2.text.placeholder};
font-size:${typography.sub.fs.fontSize}px
`

export const TextInput = styled.input`
margin-bottom:20px;

border: 0 none;
border-radius: 0;
box-shadow: none;
float: none;
background-color: transparent;
background-position: center bottom, center calc(100% - 1px);
background-repeat: no-repeat;
background-size: 0 1px, 100% 1px;
padding: 0;
transition: background 0s ease-out 0s;
color: ${colorsV2.text.medium};
min-height: 35px;
display: initial;
font-size:30px;
width: 94%;
outline: none;
padding:10px;
text-align:center;
&:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: ${colorsV2.text.light};
  }
`;