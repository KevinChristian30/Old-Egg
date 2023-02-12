import Link from "next/link";
import style from "../../../styles/components/Footer/HomeFooter/FooterComponent.module.scss";
import RouteLink from "@/interfaces/RouteLink";

interface FooterComponentProps{
  title: string,
  links: Array<RouteLink>
}

const FooterComponent = (props: FooterComponentProps) => {

  const { title, links } = props;

  return ( 
    <div className={style.footer_component}>
      <div className={style.title}>{ title }</div>
      <div className={style.container}>
        {
          links.map(link => {
            return <Link key={link.title} href={link.url} className={style.link}>{link.title}</Link>
          })
        }
      </div>
    </div>
   );
}
 
export default FooterComponent;