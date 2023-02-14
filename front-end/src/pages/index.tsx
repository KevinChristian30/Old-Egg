import Navbar from '@/components/Navbar/Navbar'
import styles from '../styles/pages/Home.module.scss'
import HomeFooter from '@/components/Footer/HomeFooter/HomeFooter'
import useAuth from '@/hooks/useAuth';

export default function Home() {

  const user = useAuth()

  return (
    <div className={styles.home}>
      <Navbar />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <HomeFooter />
    </div>
  )
}
