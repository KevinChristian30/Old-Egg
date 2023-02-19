import Image from "next/image";
import style from "../styles/components/ImageInput.module.scss";
import { useState } from "react";

interface ImageInputProps{
  value: any

  onChange: any
}

const ImageInput = (props: ImageInputProps) => {

  const [file, setFile] = useState(props.value);
  const { onChange } = props;

  return ( 
    <div className={style.image_input}>
      {
        file && <Image 
        className={style.image}
        src={URL.createObjectURL(file)}
        alt=""
        height={100}
        width={100}
        />
      }
      <input type="file" onChange={(e:any) => { 
          onChange(e.target.files[0]);  
          setFile(e.target.files[0]);
        }} />
    </div>
   );
}
 
export default ImageInput;