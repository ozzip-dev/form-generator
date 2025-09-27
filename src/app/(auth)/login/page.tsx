import { Suspense } from "react";
import Login from "@/components/pages/Login";

const PageLogin = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
export default PageLogin;
