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

  const getData = async () => {

    setUsers([])
    const data = await getAllUsers(pageNumber);
    if (data.length == 0 && pageNumber > 1) setPageNumber(pageNumber - 1);
    setUsers(data);

  }

  useEffect(()=> {
    
    getData();

  }, [pageNumber])


  const incrementPage = async () => {

    setPageNumber(pageNumber + 1);
  
  }

  const decrementPage = async () => {

    if (pageNumber - 1 === 0) setPageNumber(1);
    else setPageNumber(pageNumber - 1);

  }


  const user:any = useAuth();
  const router = useRouter();
  if (!user.role_id) return <div className="">Loading</div>
  if (useMiddleware(user, router, "Admin")) return;

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Users</h1>
        <SimplePagination
        pageNumber={ pageNumber }
        onNextButtonClicked={ incrementPage }
        onPreviousButtonClicked={ decrementPage } 
        data={users} 
        type='user'/>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={getContent()} />
   );

}
 
export default ManageUsers;
