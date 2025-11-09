import Login from "@/components/pages/auth/Login";
import { Suspense } from "react";

const PageLogin = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
export default PageLogin;
