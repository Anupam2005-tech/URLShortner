import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkLogIn } from "./redux/slice/auth/authThunks";
import App from "./App";
import QuickLinkLoader from "./components/utils/loader";
function AppEntry() {
  const dispatch = useAppDispatch();
  const loginChecked = useAppSelector((state) => state.authentication.loginChecked);

  useEffect(() => {
    dispatch(checkLogIn());
  }, [dispatch]);

  if (!loginChecked) return <div>
    <QuickLinkLoader/>
  </div>;

  return <App />;
}

export default AppEntry;