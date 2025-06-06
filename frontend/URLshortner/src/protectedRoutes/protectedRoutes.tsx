import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type React from "react";

interface protectedRouteProps{
    redirectTo?:string,
    children:React.ReactNode
}

const ProtectedRoute=({children,redirectTo=`/user/login`}:protectedRouteProps)=>{
    const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
    if(!isLoggedIn){
return <Navigate to={redirectTo} replace/>
    }
            return <>{children}</>

}
export default ProtectedRoute