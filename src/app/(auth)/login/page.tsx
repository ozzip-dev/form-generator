import Login from "@/components/pages/auth/Login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
export default LoginPage;
