import Navbar from '@/components/Navbar/Navbar'
import styles from '../styles/pages/Home.module.scss'
import HomeFooter from '@/components/Footer/HomeFooter/HomeFooter'

export default function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <HomeFooter />
    </div>
  )
}
