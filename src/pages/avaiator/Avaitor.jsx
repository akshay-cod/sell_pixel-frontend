import io from "socket.io-client";
import React, { useEffect } from "react";



const Avaitor = () => {

const [avaitorData, setAviatorData] = React.useState({});
const [avaitorBetsData, setAvaitorBetsData] = React.useState([])
const socket = io.connect("http://localhost:4000")

    const setDataFn = () => {
        socket.on("aviator",(sData)=>{
         setAviatorData(sData);
        })
      }

    const setUsersData = () => {
        socket.on("avaitor-bets",(data)=>{
            setAvaitorBetsData(data)
        })
    }
    
      React.useEffect(()=>{
      setDataFn();
      setUsersData();
      return ()=> socket.disconnect()
    },[])  

    React.useEffect(()=>{
        if (avaitorData?.isFlew == true){
            setAviatorData({});
            setAvaitorBetsData([])
        }
    },[avaitorData])

   
    
    const sendData = () => {
        socket.emit("send-value","_client"+Math.random())
    }

    return(
        <>
        <div style={{color:"white"}} onClick={()=>{sendData()}}>
                value{JSON.stringify(avaitorData)}
        </div>
        <div  style={{color:"white"}}>
            {
                avaitorBetsData?.map((data) => {
                    return(
                        <div>
                            {data?.user} and {data?.amount}
                        </div>
                    )
                })
            }
        </div>
        </>
        
    )
}

export default Avaitor;