import style from "../../styles/components/PasswordConstraintHints/PasswordConstraintHints.module.scss"

const PasswordConstraintHints = () => {
  return ( 
    <div className={style.password_constraint_hints}>
      <div className={style.left}>
        <div className={style.top}>
          Including 3 of the following:
        </div>
        <div className={style.bottom}>

        </div>
      </div>
      <div className={style.right}>
        <div className={style.top}>
          Must contain:
        </div>
        <div className={style.bottom}>
          
        </div>
      </div>
    </div>
   );
}
 
export default PasswordConstraintHints;

