import { NextRouter } from "next/router";

/* 

DOCUMENTATION

@param user      Current Active User / Any User
@param router    useRouter hook
@param role      Rolename to Validate

This Function function returns true if the middleware blocks access, 
and returns false if it doesn't, example:

if (useMiddleware(user, router, "Admin")) return;

DOCUMENTATION 

*/

const useMiddleware = (user:any, router:NextRouter, role:string) => {

  if (!user || !user.role_id) return true;

  if (role === 'Admin'){

    if (user.role_id !== 2) {
      router.back();
      return true;
    }

  }
  
  if (role === 'Shop'){

    if (user.role_id !== 3){
      router.back();
      return true;
    }

  }

  return false;
  
}

export default useMiddleware;