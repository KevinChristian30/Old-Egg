import Navbar from '@/components/Navbar/Navbar'
import styles from '../styles/pages/Home.module.scss'
import HomeFooter from '@/components/Footer/HomeFooter/HomeFooter'
import useAuth from '@/hooks/useAuth';
import CustomerHome from '@/components/Home/CustomerHome';
import AdminHome from '@/components/Home/AdminHome';

export default function Home() {

  const user:any = useAuth()

  const getHome = () => {

    if (user?.role_id == 2) return <AdminHome />
    else return <CustomerHome />

  }

  return(
    <div className={styles.home}>
      <Navbar user={user} />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      { getHome() }
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <HomeFooter />
    </div>
  );

}
