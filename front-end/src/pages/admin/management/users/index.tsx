import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../../styles/pages/admin/management/UsersPage.module.scss";
import { useRouter } from "next/router";
import SimplePagination from "@/components/Pagination/SimplePagination";
import { useEffect, useState } from "react";
import getAllUsers from "@/pages/api-calls/user/getAllUsers";

const ManageUsers = () => {
  
  const [users, setUsers] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const incrementPage = async () => {

    const toAppend = await getAllUsers(pageNumber);
    setUsers([...users, ...toAppend]);

    setPageNumber(pageNumber + 1);

  }

  useEffect(()=> {
    
    incrementPage();

  }, [])

  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Users</h1>
        <SimplePagination onNextClicked={ incrementPage } data={users} itemsPerPage={8} type='user'/>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={getContent()} />
   );

}
 
export default ManageUsers;
