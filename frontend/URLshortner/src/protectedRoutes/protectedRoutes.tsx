import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type React from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;
interface protectedRouteProps{
    redirectTo?:string,
    children:React.ReactNode
}

const ProtectedRoute=({children,redirectTo=`${backendURL}/user/login`}:protectedRouteProps)=>{
    const isLoggedIn = useAppSelector((state) => state.authentication.isloggedIn);
    if(!isLoggedIn){
return <Navigate to={redirectTo} replace/>
    }
            return <>{children}</>

}
export default ProtectedRoute