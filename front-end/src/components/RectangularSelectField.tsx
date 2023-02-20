import style from "../styles/components/RectangularSelectField.module.scss";

interface RectangularInputFieldProps{
  data: any
  width?: Number
  height?: Number

  value: any
  onChange: any
  idAttributeName: string
  optionAttributeName: string
}

const RectangularSelectField = (props: RectangularInputFieldProps) => {

  const { data, width, height, value, onChange, idAttributeName, optionAttributeName } = props;

  if (!data) return <div className="">Loading...</div>
  return ( 
    <div className={style.rectangular_select_field}>
      <select value={value} onChange={(e:any) => onChange(e.target.value)} style={{width: `${width}px`, height: `${height}px`}}>
        {
          data.map((option:any) => {
            return <option value={option[idAttributeName]} key={option[idAttributeName]}>{option[optionAttributeName]}</option>
          })
        }
      </select>
    </div>
   );
}
 
export default RectangularSelectField;