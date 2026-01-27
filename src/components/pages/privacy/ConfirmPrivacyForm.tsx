"use client";

import { useTransition } from "react";
import { confirmPrivacyPolicyAction } from "@/actions/user/confirmPrivacyPolicyAction";
import { Button } from "@/components/shared";
import Card from "@/components/shared/Card";

const ConfirmPrivacyForm = () => {
  const [isPending, startTransition] = useTransition();

  const handleConfirmPrivacyPolicy = () => {
    startTransition(async () => {
      await confirmPrivacyPolicyAction();
    });
  };

  return (
    <Card className="m-8">
      <div className="text-lg">Polityka poprawności</div>
      <div className="my-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>

      <div className="w-fit m-auto">
        <Button
          message="Akceptuję politykę poprawności"
          onClickAction={handleConfirmPrivacyPolicy}
          isLoading={isPending}
          variant="primary-rounded"
          type="button"
        />
      </div>
    </Card>
  );
};

export default ConfirmPrivacyForm;
