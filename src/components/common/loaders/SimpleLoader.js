import './loader.css'
const SimpleLoader = ({black}) => {
    return(
        <div class="lds-ellipsis"><div style={{backgroundColor:black ? "black" : "white"}}></div><div style={{backgroundColor:black ? "black" : "white"}}></div><div style={{backgroundColor:black ? "black" : "white"}}></div><div style={{backgroundColor:black ? "black" : "white"}}></div></div>
    )
}

export default SimpleLoader;