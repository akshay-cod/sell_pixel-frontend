import { useEffect, useState } from "react";
import axiosInstance from "../../../axios/AxiosInstance";
import { UPLOAD_URL } from "../../../configs/urls/urls";
import { toast } from "react-toastify";


const UploadBlock = ({ url, setUrl, label, click, setClick, accept, setFileLoading, id, limit}) => {

  const [singleFile, setSingleFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (singleFile?.length > 0) {
      uploadImage()
    }
  }, [singleFile])

  useEffect(()=>{
    if(click){
        clickBlock();
        setClick(false)
    }
  },[click])

  const config = {
    onUploadProgress: (progressEvent) => {
      const percentage = (progressEvent.loaded / progressEvent.total)*100;
      setProgress(percentage.toFixed(1));
    },
    headers: { "Content-Type": "multipart/form-data" },
  };
  const uploadImage = async () => {
    try{
     
    // Check if any file is selected or not
    if (loading) {
      return;
    }
    setLoading(true)
    if(setFileLoading){
        setFileLoading(true)
    }
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('file', fileToUpload[0]);
      //  Please change file upload URL
      let res = await axiosInstance.post(UPLOAD_URL+"/upload-single-file", data, config)

      let temp_url = url
      setUrl([ { ...res.data }, ...temp_url]);
      setSingleFile([])
    }
    setLoading(false);
    if(setFileLoading){
        setFileLoading(false)
    }
    setProgress(0)
  }
  catch(err){
    setLoading(false);
    if(setFileLoading){
        setFileLoading(false)
    }
    setProgress(0)
  }
  };

  const selectFile = async (e) => {
    if(loading) return;
    // Opening Document Picker to select one file
    try {
      console.log(e.target.files[0])
      if(limit && e.target.files[0].size/(1024*1024) > limit){
        setLoading(false);
        toast.error("file should be less than "+ limit + "mb")
        return;
      }
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setSingleFile(e.target.files);
      // await uploadImage()
    } catch (err) {
      setSingleFile(null);
    {
        // For Unknown Error
       // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const clickBlock = async () => {

    document.getElementById( id ? id :'inputref').click()
  }

  return (
    <div
    >
      <div style={Styles.container} onClick={clickBlock}>
        <div style={Styles.uploadIconHolder}>
            <div>
                <input accept={accept} id={id ? id : "inputref"} style={{display:"none"}} type="file" onChange={selectFile}/>
            </div>
          {
            loading ? <div >
             <div>loading</div>
              <div style={Styles.progressText}>
                {progress}%
              </div>
            </div>
              :
              (
                <>
                  <img
                    src=""
                  />
                  <h4 style={Styles.uploadText}>
                   { label || "Upload your files" }{ (limit ? `(${limit}mb limit)`: "")}
                  </h4>
                </>
              )
          }
        </div>

      </div>
    </div>
  )
}

export default UploadBlock;

const Styles = {
  container: {
    cursor: "pointer",
    padding:"20px 80px",
    height: 200,
    borderColor:"grey",
    borderWidth: 2,
    marginVertical: 20,
    borderStyle: "dashed",
    borderRadius: 10,
    textAlign:"center"
  },
  uploadText: {
    color: "grey",
    fontSize: 20
  },
  uploadIconHolder: {
   
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: 200,
  },
  progressText:{
    color:"white",
    textAlign:"center"
  }
}