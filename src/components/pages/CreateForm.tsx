"use client";

import { FormTemplate } from "@/types/form";
import TemplateSelect from "./create-form/TemplateSelect";
import { CreateDraft } from "@/actions/form/CreateDraft";

const CreateForm = ({ templates }: { templates: FormTemplate[] }) => {
  const insertDraft = async (templateId: string) => {
    CreateDraft(templateId);
  };

  return (
    <div className="p-4">
      <TemplateSelect templates={templates} insertDraft={insertDraft} />
      {/* TODO: choose/add other form options here? */}
    </div>
  );
};

export default CreateForm;
