"use client"

import { addTopic } from "@/actions/forum/addTopic";
import { FullscreenLoader, InputFields } from "@/components/shared";
import { SelectFieldControler } from "@/components/shared/inputs/selectField/SelectFieldController";
import { TopicCategory } from "@/enums/forum";
import { createTopicSchema, CreateTopicSchema } from "@/lib/zodSchema/createTopicSchema";
import { startTransition, useActionState, useRef } from "react";

const topicInputData: { label: string, name: string, type: string }[] = [
  { label: "Temat", name: "title", type: "text" },
  { label: "Opis", name: "description", type: "text" },
];

const categorySelectOptions = [
  { label: "Wybor inspektora", value: TopicCategory.INSPECTOR },
  { label: "Strajk", value: TopicCategory.STRIKE },
  { label: "Inne", value: TopicCategory.OTHER }
];

type State = { errors: Record<string, string[]>; inputs?: any };

const CreateTopicForm = () => {
  const isAction = useRef(false);
  const addNewTopic = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
    console.log(1)
    const data = Object.fromEntries(formData.entries()) as CreateTopicSchema;

    // const validationResult = createTopicSchema.safeParse(data);
    // if (!validationResult.success) {
    //   return {
    //     errors: validationResult.error.formErrors.fieldErrors,
    //     inputs: data,
    //   };
    // }

    isAction.current = true;
    
    const { title, category, description } = data
    console.log(title, category, description)
    const resp = await addTopic(title, category as TopicCategory, description);
    if (resp?.error) {

      // return { errors: resp?.error, inputs: data };
    }
    isAction.current = false;
    // props.handlePrintForm();
    return { errors: {}, inputs: data };
  };

  // TODO: add generic notation
  const [state, createNewTopic, isPending] = useActionState /*<{ errors: Record<string, string[]>, inputs: any }, CreateTopicSchema>*/(
    addNewTopic,
    // async (_state, { title, description, category }) => {
    //   if (!title || !description) return null;
    //   await addTopic(title, category as TopicCategory, description);
    //   return null;
    // },
    { errors: {}, inputs: null }
  );

  // const handleCreateTopic = (topic: CreateTopicSchema) => {
  //   startTransition(() => {
  //     createNewTopic(topic);
  //   });
  // };

  return (
    <>
      {isPending && <FullscreenLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            console.log(e.currentTarget)
            createNewTopic(new FormData(e.currentTarget));
          });
        }}
      >
        <InputFields
          // errorMsg={state.errors}
          inputsData={topicInputData}
          // default={defaultValues}
        />


        <select name="category">
          {categorySelectOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {/* <SelectFieldControler
          name="category"
          defaultValue={TopicCategory.OTHER}
          options={categorySelectOptions}
          onChangeAction={(name, value) => {
            handleEditType(value as InputType);
          }}
        /> */}
        <button>Utworz</button>
      </form>
    </>
  );
};

export default CreateTopicForm;
