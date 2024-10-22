import Form from 'react-bootstrap/Form';
const conversionName=["Binary","Decimal","Octal","HexaDecimal","One's Complement", "Two's Complement"];
const conversionNum=["2","10","8","16","1","12"];
function SelectForm(Props) {
  return (
    <Form.Select aria-label="Default select example" onChange={(e) => Props.setBase(parseInt(e.target.value))} >
        {conversionName.map((e,idx)=>{
            return <option value={conversionNum[idx]}>{e}</option>
        })}
    </Form.Select>
  );
}

export default SelectForm;