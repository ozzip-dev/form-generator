"use client";

import { FormTemplate } from "@/types/form";
import { ChangeEvent, useState } from "react";

// TODO Pawel: it's a draft only

type Props = {
  templates: FormTemplate[];
  insertDraft: (templateId: string) => Promise<void>;
};

const TemplateSelect = ({ templates, insertDraft }: Props) => {
  const [templateId, setTemplateId] = useState("");

  const onTemplateSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTemplateId(e.target.value);
  };

  return (
    <div className="form-template-select">
      <h2>Wybierz szablon lub utwórz formularz od zera</h2>
      <select
        name="form-template-select"
        id="form-template-select"
        onChange={onTemplateSelect}
      >
        <option value="">-- wybierz --</option>
        {templates.map(({ id, title, inputs }, i) => (
          <option value={id} key={i}>
            {title} ({inputs.map(({ header }) => header).join(", ")})
          </option>
        ))}
        <option value="empty">Nowy (pusty formularz)</option>
      </select>

      <div>Wybrano szablon: {templateId}</div>

      <button
        disabled={!templateId}
        className="btn-main"
        onClick={() => insertDraft(templateId)}
      >
        Utwórz
      </button>
    </div>
  );
};

export default TemplateSelect;
