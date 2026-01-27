"use client"

import { confirmPrivacyPolicyAction } from "@/actions/user/confirmPrivacyPolicyAction";
import Button from "@/components/shared/buttons/Button";
import { useTransition } from "react";

const ConfirmPrivacyBtn = () => {

    const [isPending, startTransition] = useTransition();

    const handleConfirmPrivacyPolicy = () => {
        startTransition(async () => {
            await confirmPrivacyPolicyAction();
        });
    };

    return (
        <div className="w-fit m-auto">
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