import styled from "styled-components";

export const WithDrawWrapper = styled.div`
    word-wrap: break-word;
    color:black;
    padding:20px;
    
`;

export const Label = styled.div`
font-size:14px;
margin-top:30px;
text-align:left;
`

export const TextInput = styled.input`
background-image: linear-gradient(#2b2b2b, #2b2b2b), linear-gradient(#bfbfbf, #bfbfbf);
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
color: rgb(43, 43, 43);
min-height: 35px;
display: initial;
width: 100%;
outline: none;
font-size: 15px;
&:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: rgb(43, 43, 43);
  }
`;

export const SaveButton = styled.div`
margin-top:20px;
background:green;
padding:10px 30px;
border-radius:10px;
cursor:pointer;
color:white;
text-align:center;
`

export const PendingStatus = styled.div`
margin-top:20px;
margin-bottom:20px;
background:#ff6100;
padding:10px 30px;
border-radius:10px;
color:white;
text-align:center;
`