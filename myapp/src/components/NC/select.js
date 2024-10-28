import react from 'react'

let val=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
let names=["2(Binary)","3(Ternary)","4(Quaternay)","5(Quinary)","6","7","8(Octal)","9","10(Decimal)","11","12","13","14","15","16(Hexadecimal)"]
function SelectItem(Props){

    return (<select id={Props.id} class="form-select" aria-label="Default select example">
        <option selected>{Props.text}</option>
        {val.map((val,index)=>{
            return <option value={val}>{names[index]}</option>
        })}
    </select>)
}


export default SelectItem;