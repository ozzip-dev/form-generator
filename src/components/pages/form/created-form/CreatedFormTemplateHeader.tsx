import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { FormState } from "@/types/form";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { startTransition, useActionState } from "react";

type Props = {
  title?: string;
  templateTitle?: string;
  isTemplate: boolean;
  isLoggedIn?: boolean;
  id?: string;
};

const CreatedFormTemplateHeader = ({
  title = "",
  templateTitle = "",
  isTemplate,
  isLoggedIn,
  id,
}: Props) => {
  const { toast } = useToast();

  const formStateHeader = isTemplate
    ? "Szkic formularza"
    : "Podgląd formularza";

  const errorDescription = "Błąd przy tworzeniu formularza.";

  const [_, createFormFromTemplate, isPending] = useActionState(async () => {
    try {
      const response = await createFormDraftAction(id as string);
      console.log({ response });
      if (!!response?.error) {
        toast({
          title: "Błąd",
          description: response?.error || errorDescription,
          variant: "error",
        });
      }
    } catch (error) {
      if (isRedirectError(error)) throw error;
      toast({
        title: "Błąd",
        description: errorDescription,
        variant: "error",
      });
    }
  }, null);

  const handleCreateForm = () => {
    startTransition(createFormFromTemplate);
  };

  return (
    <div className="fixed bottom-0 z-30 flex w-full bg-accent/90 py-4 text-center">
      <div className="m-auto grid gap-4">
        <p className="text-white">
          {formStateHeader} "{templateTitle || title}"
        </p>
        {isLoggedIn && isTemplate && (
          <Button
            className="m-auto w-fit"
            variant="empty-white"
            onClickAction={handleCreateForm}
            isLoading={isPending}
          >
            Utwórz formularz z szablonu{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreatedFormTemplateHeader;
