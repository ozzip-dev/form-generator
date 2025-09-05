import React, { Suspense } from "react";
import ResetPassword from "@/components/pages/Reset-password";

const resetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};
export default resetPasswordPage;
