import {
    InstapaperShareButton, OKIcon
  } from "react-share";
import { CopyWrapper, Lefturl, RightIcon } from "./share.styles";
import {AiOutlineCopy} from "react-icons/ai"
import { toast } from "react-toastify";

const ShareCompo = ({text}) => {
    const copyText = () => {
        navigator.clipboard.writeText(text);
        toast.success("copied url successfully")
    }
    return(
        <div style={{color:"black",padding:40}}>
      
            <CopyWrapper>
           <Lefturl>{text} </Lefturl><RightIcon
            onClick={copyText}
           ><AiOutlineCopy/> </RightIcon>
            </CopyWrapper>
           
        </div>
    )
}

export default ShareCompo;