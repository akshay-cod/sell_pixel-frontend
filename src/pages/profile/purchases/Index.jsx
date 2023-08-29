import { useState } from "react";
import Purchases from "./Purchases.jsx";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import Sellings from "./Sellings.jsx";
import Withdrawals from "./Withdrawals.jsx";

const Index = ({margin}) => {

    const [title, setTitle] = useState("Purchases")

    const onRightArrowClick = () => {
        if(title == "Purchases"){
            setTitle("Sellings")
        }
        else if(title =="Sellings"){
            setTitle("Withdrawal")
        }
        else{
          setTitle("Purchases")
        }
    }

    const onLeftArrowClick = () => {
      if(title == "Purchases"){
        setTitle("Withdrawal")
    }
    else if(title =="Withdrawal"){
        setTitle("Sellings")
    }
    else{
      setTitle("Purchases")
    }
    }

    return(
        <>
            <div style={{textAlign:"center",margin:"20px 10px 10px 10px",fontSize:20, 
            fontWeight:"bold",position:"sticky",top:0,background: "#222222",
            padding: 10}}>
              <AiFillCaretLeft
              style={{marginRight:20}}
                onClick={onLeftArrowClick}
              />{title}<AiFillCaretRight
              style={{marginLeft:20}}
                onClick={onRightArrowClick}
              />
            </div>
            <div>
            {
                title == "Purchases" ? <Purchases margin={margin}/> : title == "Withdrawal" ? <Withdrawals margin={margin}/>: <Sellings margin={margin}/>
              }  
            </div>
             
        </>
    )
}
export default Index;