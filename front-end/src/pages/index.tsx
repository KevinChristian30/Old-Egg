import styles from '../styles/pages/Home.module.scss'
import useAuth from '@/hooks/useAuth';
import CustomerHome from '@/components/Home/CustomerHome/CustomerHome';
import AdminHome from '@/components/Home/AdminHome';
import HomeLayout from '@/layouts/HomeLayout';

export default function Home() {

  const user:any = useAuth()

  const getHome = () => {

    if (user?.role_id == 2) return <AdminHome />
    else return <CustomerHome />

  }

  return(
    <div className={styles.home}>
      <HomeLayout noGap user={user} content={getHome()} />
    </div>
  );

}
