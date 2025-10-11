// "use client";

// import { FormTemplate } from "@/types/form";
// import { ChangeEvent, useState } from "react";

// // TODO Pawel: it's a draft only

// type Props = {
//   templates: FormTemplate[];
//   insertDraft: (templateId: string) => Promise<void>;
// };

// const TemplateSelect = ({ templates, insertDraft }: Props) => {
//   const [templateId, setTemplateId] = useState("");

//   const onTemplateSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
//     setTemplateId(e.target.value);
//   };

//   return (
//     <div className="form-template-select">
//       <h2>Wybierz szablon lub utwórz formularz od zera</h2>
//       <select
//         name="form-template-select"
//         id="form-template-select"
//         onChange={onTemplateSelect}
//       >
//         <option value="">-- wybierz --</option>
//         {templates.map(({ id, title, inputs }, i) => (
//           <option value={id} key={i}>
//             {title} ({inputs.map(({ header }) => header).join(", ")})
//           </option>
//         ))}
//         <option value="empty">Nowy (pusty formularz)</option>
//       </select>

//       <div>Wybrano szablon: {templateId}</div>

//       <button
//         disabled={!templateId}
//         className="btn btn-main"
//         onClick={() => insertDraft(templateId)}
//       >
//         Utwórz formularz
//       </button>
//     </div>
//   );
// };

// export default TemplateSelect;

"use client";

import { FormTemplate } from "@/types/form";
import { ChangeEvent, useState } from "react";
import { CreateDraft } from "@/actions/form/CreateDraft";

type Props = {
  templates: FormTemplate[];
};

const TemplateSelect = ({ templates }: Props) => {
  const [templateId, setTemplateId] = useState("");
  const [loading, setLoading] = useState(false);

  const onTemplateSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTemplateId(e.target.value);
  };

  const handleCreate = async () => {
    if (!templateId) return;
    setLoading(true);
    try {
      await CreateDraft(templateId); // ⬅️ logika z poprzedniego CreateForm
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-template-select p-4">
      <h2 className="text-lg font-semibold mb-2">
        Wybierz szablon lub utwórz formularz od zera
      </h2>

      <select
        name="form-template-select"
        id="form-template-select"
        onChange={onTemplateSelect}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">-- wybierz --</option>
        {templates.map(({ id, title, inputs }) => (
          <option value={id} key={id}>
            {title} ({inputs.map(({ header }) => header).join(", ")})
          </option>
        ))}
        <option value="empty">Nowy (pusty formularz)</option>
      </select>

      <div className="text-sm mb-2">
        {templateId ? `Wybrano: ${templateId}` : "Nie wybrano szablonu"}
      </div>

      <button
        disabled={!templateId || loading}
        className={`btn btn-main ${loading ? "opacity-50" : ""}`}
        onClick={handleCreate}
      >
        {loading ? "Tworzenie..." : "Utwórz formularz"}
      </button>
    </div>
  );
};

export default TemplateSelect;
