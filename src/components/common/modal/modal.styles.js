import styled from "styled-components";

export const ModalWrapper = styled.div`
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.9);
  position:fixed;
  top:0;
  z-index:100;
`

export const ModalInsideWrapper = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:400px;
  background:white;
  border-radius:10px;
`