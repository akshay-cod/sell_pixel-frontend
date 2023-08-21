import styled from "styled-components";

export const WalletWrapper = styled.div`
display:flex;
justify-content:flex-start;
margin:20px 30%;
flex-direction:column;
@media (max-width: 700px) {
  margin:10%
}
@media (max-width: 500px) {
  margin:5%
}
min-height:80vh;
`

export const WalletHeading = styled.div`
 font-size:34px;
 font-weight:bold;
 text-align:center;
`

export const WalletCard = styled.div`
border-radius:10px;
background:rgb(43, 43, 43);
margin-top:20px;
margin-bottom:10px;
text-align:center;
padding:50px 20px 30px 20px;
`

export const WalletMoneyText = styled.div`
font-size:50px;
font-weight:600;
`

export const WalletTotalBalanceText = styled.div`
color: #358435;
font-weight: 600;
`;

export const WithDrawbanWrapper = styled.div`
display:flex;
justify-content:space-between;
color:white;
margin-top:10px;
`

export const WithdrawWrapper = styled.div`
background:#3B3B3B;
border-radius:5px;
padding:10px 20px;
font-weight: 500;
cursor: pointer;
`

export const BankDetailsWrapper = styled.div`
background:#3B3B3B;
border-radius:5px;
padding:10px 14px;
font-weight: 500;
cursor: pointer;
`