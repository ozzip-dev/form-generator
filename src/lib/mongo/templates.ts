/*
  Lists of default inputs and forms used as templates to create new forms
  Custom id values assigned so database can be queried: 
    if input/form exists, do nothing
    if it's missing add to input/form template list
*/

import { TemplateInputId } from "@/models/Input";
import { Form } from "@/types/form";
import { Input } from "@/types/input";

export const inputTemplates: Input[] = [
  {
    id: TemplateInputId.SURNAME_NAME,
    type: 'text',
    header: 'Imię i nazwisko',
    description: 'Podaj swoje imię i nazwisko',
    validation: {},
  },
  {
    id: TemplateInputId.ADDRESS,
    type: 'text',
    header: 'Adres',
    description: 'Podaj swój adres',
    validation: {},
  },
  {
    id: TemplateInputId.AGE,
    type: 'number',
    header: 'Adres',
    description: 'Podaj swój adres',
    validation: {},
  },
  {
    id: TemplateInputId.CONTRACT_TYPE,
    type: 'singleSelect',
    header: 'Typ umowy',
    description: 'Jaką masz umowę?',
    validation: {},
    options: [
      'Umowa o pracę',
      'Umowa o dzieło',
      'Umowa zlecenie',
      'B2B',
      "Inne"
    ],
  }
]

const getCreatedUpdatedDates = (): { 
  createdAt: Date,
  updatedAt: Date
 } => {
  const now = new Date()

  return {
    createdAt: now,
    updatedAt: now,
  }
}

export const formTemplates: Form[] = [
  {
    id: 'membership',
    title: 'Członkostwo',
    description: 'Dołącz do nas',
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: 'name',
        type: 'text',
        header: 'Imię',
        validation: {},
        required: true,
        order: 0,
        unique: false
      },
      {
        id: 'email',
        type: 'email',
        header: 'Email',
        validation: {},
        required: true,
        order: 1,
        unique: false
      },
      {
        id: 'login',
        type: 'text',
        header: 'Login id',
        validation: {},
        required: true,
        order: 2,
        unique: true
      },
    ]
  }
]