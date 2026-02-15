/*
  Lists of default inputs and forms used as templates to create new forms
  Custom id values assigned so database can be queried:
    if input/form exists, do nothing
    if it's missing add to input/form template list
*/

import { InputType } from "@/enums";
import { FormResultVisibility, FormType } from "@/enums/form";
import { Form } from "@/types/form";

const getCreatedUpdatedDates = (): {
  createdAt: Date;
  updatedAt: Date;
} => {
  const now = new Date();

  return {
    createdAt: now,
    updatedAt: now,
  };
};

export const formTemplates: Form[] = [
  {
    id: "membership",
    type: FormType.Other,
    resultVisibility: FormResultVisibility.Open,
    title: "Członkostwo",
    description: "Dołącz do nas",
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: "name",
        type: InputType.TEXT,
        header: "Imię",
        validation: {},
        options: [],
        required: true,
        order: 0,
        unique: false,
        hidden: false,
      },
      {
        id: "email",
        type: InputType.EMAIL,
        header: "Email",
        validation: {},
        options: [],
        required: true,
        order: 1,
        unique: false,
        hidden: false,
      },
      {
        id: "login",
        type: InputType.TEXT,
        header: "Login id",
        validation: {},
        options: [],
        required: true,
        order: 2,
        unique: true,
        hidden: true,
      },
    ],
  },
  {
    id: "strike",
    title: "Referendum strajkowe w [nazwa firmy]",
    description:
      '<p>Oddaj głos w referendum strajkowym dla zatrudnionych przez [nazwa firmy]</p><p></p><p><mark class="bg-accent">Referendum jest anonimowe</mark></p>',
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: "strike-select",
        type: InputType.SINGLE_SELECT,
        header: "Czy jesteś ZA podjęciem strajku w sprawie:",
        description: "<p>1. Żądanie<br>2. Żądanie<br>3. Żądanie</p>",
        validation: {},
        options: [
          {
            value: "thu-feb-12-73148",
            label: "tak",
          },
          {
            value: "thu-feb-12-93542",
            label: "nie",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 0,
      },
      {
        id: "id-number",
        type: InputType.NUMBER,
        header:
          "W celu weryfikacji głosu przez [nazwa organizacji związkowej] podaj Swój numer identyfikatora pracowniczego",
        validation: {},
        options: [],
        required: true,
        unique: true,
        hidden: false,
        order: 1,
      },
      {
        id: "trade-union-info-1",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          '<p>Chcesz dowiedzieć się więcej o działalności <strong>[ nazwa organizacji związkowej ]</strong>? Odwiedź nasze profile w <a target="_blank" rel="noopener noreferrer nofollow" href="wwww">media społecznościowe</a></p>',
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 2,
      },
      {
        id: "trade-union-info-2",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          "<p>Osoby zainteresowane wstąpieniem do <strong>[nazwa organizacji związkowej] </strong>prosimy o kontakt telefoniczny: <strong>[nr telefonu] </strong>lub e-mailowy: <strong>[adres e-mail]</strong>.</p>",
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 3,
      },
    ],
    state: "template",
    type: FormType.Strike,
    resultVisibility: FormResultVisibility.Secret,
    displayAuthorEmail: true,
    url: "referendum-szablon",
    headerFileId: "698e38ca2d3cca1353991f62",
  },
];
