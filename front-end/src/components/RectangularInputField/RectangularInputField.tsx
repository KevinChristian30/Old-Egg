import style from "../../styles/components/RectangularInputField.module.scss"

interface RectangularInputFieldProps{
  placeholder?: string
  width?: number
  height?: number
  
  email?: boolean
  password?: boolean
  number?: boolean
}

const RectangularInputField = (props: RectangularInputFieldProps) => {

  const placeholder = props.placeholder;
  const width = props.width;
  const height = props.height;
  
  const styling = {
    width: width,
    height: height
  }

  const getResult = () => {

    if (props.email) return <input type="email" placeholder={placeholder} style={styling}/>
    if (props.password) return <input type="password" placeholder={placeholder} style={styling}/>
    if (props.number) return <input type="number" placeholder={placeholder} 
                                style={styling} className={style.number}/>
    return <input type="text" placeholder={placeholder} style={styling}/>
  
  }

  return ( 
    <div className={style.square_input_field}>
      { getResult() }
    </div>
   );
}
 
export default RectangularInputField;