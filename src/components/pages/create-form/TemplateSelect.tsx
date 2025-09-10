'use client'

import { FormTemplate } from "@/types/form"
import { useState } from "react"

const TemplateSelect = ({ templates }: { templates: FormTemplate[] }) => {
  const [template, useTemplate] = useState('')

  const onTemplateSelect = (e) => {
    useTemplate(e.target.value)
  }

  return (
    <div className="form-template-select">
      <h2>
        Wybierz szablon lub utwórz formularz od zera
      </h2>
      <select 
        name="form-template-select"
        id="form-template-select"
        onChange={onTemplateSelect}  
      >
        {templates.map(({ id, title, inputs }, i) => (
          <option value={id} key={i}>
            {title} ({inputs.map(({ header }) => header).join(', ')})
          </option>
        ))}
        <option value="new">Nowy</option>
      </select>

      <div>
        Wybrano szablon: {template}
      </div>
    </div>
  )
}

export default TemplateSelect