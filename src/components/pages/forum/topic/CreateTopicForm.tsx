"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTopicAction } from "@/actions/forum/addTopicAction";
import {
  Button,
  Card,
  FullscreenLoader,
  InputFields,
} from "@/components/shared";
import { TopicCategory } from "@/enums/forum";
import { useToast } from "@/context/ToastProvider";
import { createTopicSchema } from "@/lib/zod-schema/forum-schemas/createTopicSchema";
import { SelectFieldControler } from "@/components/shared/inputs/select-field/SelectFieldController";

const topicInputData: { floatingLabel: string; name: string; type: string }[] =
  [
    { floatingLabel: "Tytuł", name: "title", type: "text" },
    { floatingLabel: "Opis", name: "description", type: "text" },
  ];

const categorySelectOptions = [
  { floatingLabel: "Formularz", value: TopicCategory.FORM },
  { floatingLabel: "Protokół", value: TopicCategory.PROTOCOL },
  { floatingLabel: "Inne", value: TopicCategory.OTHER },
];

const CreateTopicForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const methods = useForm({
    defaultValues: { title: "", description: "", category: "" },
    mode: "onTouched",
    resolver: zodResolver(createTopicSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof createTopicSchema>> = async (
    data,
  ) => {
    const validationResult = createTopicSchema.safeParse(data);
    if (!validationResult.success) {
      toast({
        title: "Błąd",
        description: "Nieprawidłowe dane",
        variant: "error",
      });
      return;
    }
    const { title, category, description } = data;
    try {
      await addTopicAction(title, category as TopicCategory, description);
      toast({
        title: "Sukces",
        description: "Utworzono temat",
        variant: "success",
      });
      reset();
      router.push("/forum/list");
    } catch (e: unknown) {
      toast({
        title: "Błąd",
        description: "Nie udało się stworzyć tematu",
        variant: "error",
      });
    }
  };

  return (
    <Card className="mx-8">
      {isSubmitting && <FullscreenLoader />}
      <div className="pb-8 text-lg font-black">Utwórz nowy temat</div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {topicInputData.map((input) => (
            <div key={input.name} className="mb-4">
              <InputFields
                errorMsg={errors}
                inputsData={[input]}
                register={methods.register}
              />
            </div>
          ))}
          <SelectFieldControler
            name="category"
            label="Wybierz kategorię"
            options={categorySelectOptions.map(({ value, floatingLabel }) => ({
              value,
              label: floatingLabel,
            }))}
          />
          <div className="mt-6 flex gap-8">
            <Link
              href="/forum/list"
              className="btn-primary rounded-sm !bg-white !text-accent"
            >
              Wróć
            </Link>
            <Button message="Utwórz" />
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CreateTopicForm;
