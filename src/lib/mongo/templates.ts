/*
  Lists of default inputs and forms used as templates to create new forms
  Custom id values assigned so database can be queried: 
    if input/form exists, do nothing
    if it's missing add to input/form template list
*/

import { Input } from "@/types/input";

export const inputTemplates: Input[] = [
  {
    id: 'surname_name',
    type: 'text',
    header: 'Imię i nazwisko',
    description: 'Podaj swoje imię i nazwisko',
    validation: {},
  },
  {
    id: 'address',
    type: 'text',
    header: 'Adres',
    description: 'Podaj swój adres',
    validation: {},
  },
  {
    id: 'age',
    type: 'number',
    header: 'Adres',
    description: 'Podaj swój adres',
    validation: {},
  },
  {
    id: 'contract_type',
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
