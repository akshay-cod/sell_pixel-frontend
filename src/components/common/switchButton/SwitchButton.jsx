import "./switch.css";
const SwitchButton = ({checked, setChecked}) => {
console.log(checked)
    return(
        <label class="switch">
        <input type="checkbox" checked={checked} onChange={(e)=>{setChecked(!checked)}}/>
        <span class="slider round"></span>
        </label>
    )
}
export default SwitchButton;