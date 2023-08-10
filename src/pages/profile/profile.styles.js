import styled from "styled-components";

export const ProfileWrapper = styled.div`
display:flex;
justify-content:center;
margin:20px 30%;
flex-direction:column;
@media (max-width: 700px) {
  margin:10%
}
@media (max-width: 500px) {
  margin:5%
}
`


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
color: #bfbfbf;
min-height: 35px;
display: initial;
width: 100%;
outline: none;
font-size: 15px;
&:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: white;
  }
`;

export const Textarea = styled.textarea`
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
color: #bfbfbf;
min-height: 35px;
display: initial;
width: 100%;
outline: none;
resize: none;
font-size: 15px;
&:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: white;
  }
`;

export const ProfileImage = styled.img`
border-radius:50%;
width:200px;
object-fit:contain;
background:rgb(43, 43, 43);
height:200px
`

export const ChangeProfilePicText = styled.div`
 background:rgb(43, 60, 48, 0.6);
 position:absolute;
 top:75%;
 cursor:pointer;
 padding:5px 5px;
 border-radius:10px;
`

export const ProfileImageWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
position:relative;
`

export const ButtonWrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-top:20px;
`

export const SubmitBtn = styled.div`
background:green;
padding:10px 30px;
border-radius:10px;
cursor:pointer;
`

export const LoaderHolder = styled.div`
 min-height:80vh;
 display:flex;
 justify-content:center;
 align-items:center;
 flex-direction:column;
`