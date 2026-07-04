"use client";

import { confirmPrivacyPolicyAction } from "@/actions/user/confirmPrivacyPolicyAction";
import { Button } from "@/components/shared";
import { useTransition } from "react";

const ConfirmPrivacyBtn = () => {
  const [isPending, startTransition] = useTransition();

  const handleConfirmPrivacyPolicy = () => {
    startTransition(async () => {
      await confirmPrivacyPolicyAction();
    });
  };

  return (
    <div className="m-auto w-fit">
      <Button
        message="Akceptuję politykę prywatności"
        onClickAction={handleConfirmPrivacyPolicy}
        isLoading={isPending}
        variant="primary-rounded"
        type="button"
      />
    </div>
  );
};

export default ConfirmPrivacyBtn;
