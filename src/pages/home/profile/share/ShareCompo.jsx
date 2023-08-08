import {
    InstapaperShareButton, OKIcon
  } from "react-share";
import { CopyWrapper, Lefturl, RightIcon } from "./share.styles";
import {AiOutlineCopy} from "react-icons/ai"
import { toast } from "react-toastify";

const ShareCompo = () => {
    const copyText = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("copied url successfully")
    }
    return(
        <div style={{color:"black",padding:40}}>
      
            <CopyWrapper>
           <Lefturl>{window.location.href} </Lefturl><RightIcon
            onClick={copyText}
           ><AiOutlineCopy/> </RightIcon>
            </CopyWrapper>
           
        </div>
    )
}

export default ShareCompo;