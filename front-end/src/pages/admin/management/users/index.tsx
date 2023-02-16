import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import HomeLayout from "@/layouts/HomeLayout";
import getAllUsers from "@/pages/api-calls/user/getAllUsers";
import style from "../../../../styles/pages/admin/management/UsersPage.module.scss";
import { useRouter } from "next/router";
import SimplePagination from "@/components/Pagination/SimplePagination";

const ManageUsers = (props:any) => {
  
  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  const { users } = props; 

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Users</h1>
        <SimplePagination data={users} itemsPerPage={8} type='user'/>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={getContent()} />
   );

}
 
export default ManageUsers;

export async function getStaticProps(){

  const users = await getAllUsers();

  return {
    props: {
      users: users
    }
  }

}
