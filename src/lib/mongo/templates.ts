/*
  Lists of default inputs and forms used as templates to create new forms
  Custom id values assigned so database can be queried:
    if input/form exists, do nothing
    if it's missing add to input/form template list
*/

import { InputType } from "@/enums";
import { Form } from "@/types/form";

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
    type: 'other',
    title: 'Członkostwo',
    description: 'Dołącz do nas',
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: 'name',
        type: InputType.TEXT,
        header: 'Imię',
        validation: {},
        options: [],
        required: true,
        order: 0,
        unique: false
      },
      {
        id: 'email',
        type: InputType.EMAIL,
        header: 'Email',
        validation: {},
        options: [],
        required: true,
        order: 1,
        unique: false
      },
      {
        id: 'login',
        type: InputType.TEXT,
        header: 'Login id',
        validation: {},
        options: [],
        required: true,
        order: 2,
        unique: true
      },
    ]
  },
  {
    id: 'favourite-color',
    type: 'other',
    title: 'Ulubiony kolor',
    description: 'Jaki jest Twój ulubiony kolor?',
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: 'name-surname',
        type: InputType.TEXT,
        header: 'Imię i nazwisko',
        validation: {},
        options: [],
        required: true,
        order: 0,
        unique: false
      },
      {
        id: 'age',
        type: InputType.NUMBER,
        header: 'Wiek',
        validation: {},
        options: [],
        required: false,
        order: 1,
        unique: false
      },
      {
        id: 'color',
        type: InputType.SINGLE_SELECT,
        header: 'Kolor',
        validation: {},
        required: true,
        order: 2,
        unique: false,
        options: [
          'żółty',
          'zielony',
          'czerwony'
        ]
      },
    ]
  }
]