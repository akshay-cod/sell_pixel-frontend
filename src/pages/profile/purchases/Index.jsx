import { useState } from "react";
import Purchases from "./Purchases.jsx";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import Sellings from "./Sellings.jsx";

const Index = () => {

    const [title, setTitle] = useState("Purchases")

    const onRightArrowClick = () => {
        if(title == "Purchases"){
            setTitle("Sellings")
        }
        else{
            setTitle("Purchases")
        }
    }

    const onLeftArrowClick = () => {
        if(title == "Purchases"){
            setTitle("Sellings")
        }
        else{
            setTitle("Purchases")
        }
    }

    return(
        <>
            <div style={{textAlign:"center",margin:"20px 10px 10px 10px",fontSize:20, fontWeight:"bold"}}>
              <AiFillCaretLeft
              style={{marginRight:20}}
                onClick={onRightArrowClick}
              />{title}<AiFillCaretRight
              style={{marginLeft:20}}
                onClick={onLeftArrowClick}
              />
            </div>
              {
                title == "Purchases" ? <Purchases /> : <Sellings/>
              }  
        </>
    )
}
export default Index;