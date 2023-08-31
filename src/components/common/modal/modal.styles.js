import styled from "styled-components";

export const ModalWrapper = styled.div`
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.9);
  position:fixed;
  top:0;
  left:0;
  z-index:100;
`

export const ModalInsideWrapper = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:400px;
  background:${(props)=> props.color ? props.color : "white"};
  border-radius:10px;
  @media (max-width: 700px) {
    width:350px;
  }
  @media (max-width: 450px) {
    width:350px;
  }
  @media (max-width: 300px) {
    width:250px;
  }
`