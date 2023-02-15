import style from "../../styles/components/RectangularInputField.module.scss"

interface RectangularInputFieldProps{
  placeholder?: string
  width?: number
  height?: number
  value?: any
  required?: boolean
  onChange: any 
  
  email?: boolean
  password?: boolean
  number?: boolean
  area?: boolean
}

const RectangularInputField = (props: RectangularInputFieldProps) => {

  const { placeholder, width, height, value, required, onChange } = props;
  
  const styling = {
    width: width,
    height: height
  }

  const getResult = () => {

    const inputTypes = {
      email: "email",
      password: "password",
      number: "number",
      text: "text",
    }

    let inputType = ''
    if (props.email) inputType = inputTypes.email
    else if (props.password) inputType = inputTypes.password
    else if (props.number) inputType = inputTypes.number
    else inputType = inputTypes.text

    if (props.area){
      return <textarea placeholder={placeholder} style={styling} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
    }

    return <input type={inputType} placeholder={placeholder} style={styling} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
  
  }

  return ( 
    <div className={style.square_input_field}>
      { getResult() }
    </div>
   );
}
 
export default RectangularInputField;