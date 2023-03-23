import styles from '../styles/pages/Home.module.scss'
import useAuth from '@/hooks/useAuth';
import CustomerHome from '@/components/Home/CustomerHome/CustomerHome';
import AdminHome from '@/components/Home/AdminHome';
import HomeLayout from '@/layouts/HomeLayout';
import ShopHome from '../components/Home/ShopHome';
import CustomerServiceHome from '@/components/Home/CustomerServiceHome';

export default function Home() {

  const user:any = useAuth();

  const getHome = () => {

    if (user.role_id === 2) return <AdminHome />
    else if (user.role_id === 3) return <ShopHome shopID={user.id} /> 
    else if (user.role_id === 4) return <CustomerServiceHome /> 
    else return <CustomerHome />

  }

  return(
    <div className={styles.home}>
      <HomeLayout noGap user={user} content={getHome()} />
    </div>
  );

}
