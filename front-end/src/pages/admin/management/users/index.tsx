import UserCard from "@/components/Card/UserCard";
import useAuth from "@/hooks/useAuth";
import useMiddleware from "@/hooks/useMiddleware";
import HomeLayout from "@/layouts/HomeLayout";
import getAllUsers from "@/pages/api-calls/user/getAllUsers";
import style from "../../../../styles/pages/admin/management/UsersPage.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import User from "@/types/User";
import RectangularButton from "@/components/RectangularButton";

const ManageUsers = () => {
  
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  let displayedUsers:User[] = [];
  
  const user = useAuth();
  const router = useRouter();
  if (useMiddleware(user, router, "Admin")) return;

  getAllUsers().then(u => setUsers(u))

  const itemsPerPage = 8, maxPage = Math.ceil(users.length / itemsPerPage);
  displayedUsers = [];
  for (let i = pageNumber * itemsPerPage; i < pageNumber * itemsPerPage + itemsPerPage; i++){

    if (users[i]){
      displayedUsers.push(users[i]);
    } else break;

  }
  
  const incrementPage = () => {

    if (pageNumber + 1 > maxPage) setPageNumber(0)
    setPageNumber((pageNumber + 1) % maxPage);
    
  }
  
  const decrementPage = () => {
    
    if (pageNumber - 1 < 0) setPageNumber(maxPage - 1);
    else setPageNumber((pageNumber - 1) % maxPage);

  }

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>View Users</h1>
        <br />
        <div className={style.button_container}>
          <h3>Page: {pageNumber + 1}</h3>
          <RectangularButton onClick={ decrementPage } orange content={ <div>Prev</div> } width={100} />
          <RectangularButton onClick={ incrementPage } orange content={ <div>Next</div> } width={100} />
        </div>  
        <br />
        <div className={style.container}>
          {
            displayedUsers.map((user) => {
              return <UserCard user={user} />
            })
          }
        </div>
      </div>
    );

  }

  return ( 
    <HomeLayout user={user} content={getContent()} />
   );

}
 
export default ManageUsers;
