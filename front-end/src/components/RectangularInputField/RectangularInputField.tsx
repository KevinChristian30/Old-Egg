import { useState } from "react"
import style from "../../styles/components/RectangularInputField.module.scss"

interface RectangularInputFieldProps{
  placeholder?: string
  width?: number
  height?: number
  
  email?: boolean
  password?: boolean
  number?: boolean

  required?: boolean

}

const RectangularInputField = (props: RectangularInputFieldProps) => {

  const placeholder = props.placeholder;
  const width = props.width;
  const height = props.height;

  const [value, setValue] = useState('');
  
  const styling = {
    width: width,
    height: height
  }

  const getResult = () => {

    if (props.email) return <input type="email" placeholder={placeholder} style={styling} value={value} onChange={(e) => setValue(e.target.value)}/>
    if (props.password) return <input type="password" placeholder={placeholder} style={styling} value={value} onChange={(e) => setValue(e.target.value)}/>
    if (props.number) return <input type="number" placeholder={placeholder} style={styling} className={style.number} value={value} onChange={(e) => setValue(e.target.value)}/>
    return <input type="text" placeholder={placeholder} style={styling} value={value} onChange={(e) => setValue(e.target.value)}/>
  
  }

  return ( 
    <div className={style.square_input_field}>
      { getResult() }
    </div>
   );
}
 
export default RectangularInputField;