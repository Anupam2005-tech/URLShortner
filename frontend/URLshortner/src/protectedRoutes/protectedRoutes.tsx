import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import type React from "react";
import QuickLinkLoader from "../components/utils/loader";

interface protectedRouteProps{
    redirectTo?:string,
    children:React.ReactNode
}

const ProtectedRoute=({children,redirectTo=`/user/login`}:protectedRouteProps)=>{
    const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
    const loginChecked = useAppSelector((state) => state.authentication.loginChecked);
    
    // Wait for authentication check to complete
    if (!loginChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
          <QuickLinkLoader />
        </div>
      );
    }
    
    if(!isLoggedIn){
      return <Navigate to={redirectTo} replace/>
    }
    
    return <>{children}</>
}

export default ProtectedRoute