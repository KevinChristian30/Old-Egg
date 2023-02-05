import style from "../styles/components/SingleTextLink.module.scss"

interface SingleTextLinkProps {
  text: string,
  red?: boolean
}

const SingleTextLink = (props: SingleTextLinkProps) => {

  const text = props.text;
  const red = props.red;

  const getResult = () => {
    if (!red) return <div>{text}</div>
    return <div className={style.red_link}>{text}</div>
  }

  return ( 
      <div className={style.single_text_link}>
        { getResult() }
      </div>
   );
}
 
export default SingleTextLink;