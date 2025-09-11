"use client";

import { FormTemplate } from "@/types/form";
import TemplateSelect from "./create-form/TemplateSelect";

const CreateForm = ({ templates }: { templates: FormTemplate[] }) => {
  return (
    <div className="p-4">
      <TemplateSelect templates={templates} />
    </div>
  );
};

export default CreateForm;
