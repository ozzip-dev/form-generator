"use client";

import { FormTemplate } from "@/types/form";
import { ChangeEvent, useState } from "react";

// TODO Pawel: it's a draft only

const TemplateSelect = ({ templates }: { templates: FormTemplate[] }) => {
  const [template, setTemplate] = useState("");

  const onTemplateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setTemplate(e.target.value);
  };

  return (
    <div className="form-template-select">
      <h2>Wybierz szablon lub utwórz formularz od zera</h2>
      <select
        name="form-template-select"
        id="form-template-select"
        onChange={onTemplateSelect}
      >
        {templates.map(({ id, title, inputs }, i) => (
          <option value={id} key={i}>
            {title} ({inputs.map(({ header }) => header).join(", ")})
          </option>
        ))}
        <option value="new">Nowy</option>
      </select>

      <div>Wybrano szablon: {template}</div>
    </div>
  );
};

export default TemplateSelect;
