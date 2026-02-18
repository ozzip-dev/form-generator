/*
  Lists of default inputs and forms used as templates to create new forms
  Custom id values assigned so database can be queried:
    if input/form exists, do nothing
    if it's missing add to input/form template list
*/

import { InputType } from "@/enums";
import { FormResultVisibility, FormType } from "@/enums/form";
import { TemplateFormId } from "@/models/Form";
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
    id: TemplateFormId.SURVEY,
    title: "Ankieta dotycząca warunków pracy w [nazwa zakładu pracy]",
    description:
      '<p>Twoja opinia jest dla nas ważna. Ankieta jest <mark class="bg-accent">anonimowa</mark> i pomoże nam lepiej zrozumieć potrzeby załogi.</p>',
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: "survey-1",
        type: InputType.SINGLE_SELECT,
        header: "W jakim dziale pracujesz",
        validation: {},
        options: [
          {
            value: "survey-1-69042",
            label: "Produkcja",
          },
          {
            value: "survey-1-18415",
            label: "Administracja",
          },
          {
            value: "survey-1-72235",
            label: "Logistyka",
          },
          {
            value: "other",
            label: "Inny",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 0,
      },
      {
        id: "survey-2",
        type: InputType.NUMBER,
        header: "Ile lat pracujesz w firmie?",
        validation: {},
        options: [],
        required: true,
        unique: false,
        hidden: false,
        order: 1,
      },
      {
        id: "survey-3",
        type: InputType.SINGLE_SELECT,
        header: "Przez kogo jesteś zatrudniony/a?",
        validation: {},
        options: [
          {
            value: "survey-3-1104",
            label: "[nazwa firmy]",
          },
          {
            value: "survey-3-87518",
            label: "[nazwa agencji]",
          },
          {
            value: "survey-3-65128",
            label: "[nazwa agencji pracy]",
          },
          {
            value: "other",
            label: "Inne",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 2,
      },
      {
        id: "survey-4",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          '<p>Chcesz dowiedzieć się więcej o działalności <strong>[nazwa organizacji związkowej ]</strong>? Odwiedź nasze profile w <a target="_blank" rel="noopener noreferrer nofollow" href="https://form-generator-test.sliplane.app/forms/698e367c2d3cca1353991f60/wwww">media społecznościowe</a></p>',
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 3,
      },
      {
        id: "survey-5",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          "<p>Osoby zainteresowane wstąpieniem do <strong>[nazwa organizacji związkowej] </strong>prosimy o kontakt telefoniczny: <strong>[nr telefonu] </strong>lub e-mailowy: <strong>[adres e-mail]</strong>.</p>",
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 4,
      },
      {
        id: "survey-6",
        type: InputType.PARAGRAPH,
        header: "Które elementy warunków pracy wymagają Twoim zdaniem poprawy?",
        validation: {},
        options: [
          {
            value: "survey-6-2320",
            label: "Organizacja czasu pracy",
          },
          {
            value: "survey-6-80572",
            label: "Wyposażenie stanowiska pracy",
          },
          {
            value: "survey-6-98254",
            label: "Komunikacja z przełożonym",
          },
          {
            value: "survey-6-58504",
            label: "Poziom wynagrodzenia",
          },
          {
            value: "survey-6-29066",
            label: "Możliwości rozwoju zawodowego",
          },
          {
            value: "other",
            label: "Inne",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 5,
      },
    ],
    state: "template",
    type: FormType.Survey,
    resultVisibility: FormResultVisibility.Secret,
    displayAuthorEmail: false,
  },
  {
    id: TemplateFormId.SIP,
    title:
      "Wybory Społecznego Inspektora Pracy w [nazwa przedsiębiorstwa] na kadencję [lata kadencji]",
    description:
      "<p>Weź udział w głosowaniu i wybierz osobę, która będzie reprezentować pracowników w sprawach bezpieczeństwa i warunków pracy.</p><p></p><p>Wybory odbywają się w dniach [daty].</p><p></p><p><strong>Uprawnione&nbsp;</strong>do głosowania&nbsp;<strong>są</strong>&nbsp;wyłącznie osoby zatrudnione przez <strong>[nazwa przedsiębiorstwa]</strong>.<strong>&nbsp;</strong></p><p>Wybory są anonimowe.</p>",
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: "sip-1",
        type: InputType.SINGLE_SELECT,
        header: "Wybierz swojego kandydata na Społecznego Inspektora Pracy",
        validation: {},
        options: [
          {
            value: "sip-1-82284",
            label: "Jan",
          },
          {
            value: "sip-1-43992",
            label: "Maria",
          },
          {
            value: "sip-1-51557",
            label: "Tomasz",
          },
          {
            value: "sip-1-428",
            label: "Mariola",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 0,
      },
      {
        id: "sip-2",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          "<p><strong>Każdy uprawniony pracownik może oddać jeden głos.</strong></p>",
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 1,
      },
      {
        id: "sip-3",
        type: InputType.NUMBER,
        header:
          "W celu weryfikacji głosu przez [nazwa organizacji związkowej] podaj Swój numer identyfikatora pracowniczego.",
        description:
          '<p>Każdy identyfikator może zostać użyty <mark class="bg-accent">tylko raz</mark>. Ponowne wprowadzenie tych<strong> </strong>samych danych uniemożliwi wysłanie formularza.</p>',
        validation: {},
        options: [],
        required: true,
        unique: true,
        hidden: true,
        order: 2,
      },
      {
        id: "sip-4",
        type: InputType.PARAGRAPH,

        header: "",
        description:
          '<p>Wyniki głosowania zostaną ogłoszone [metoda ogłoszenia wyników].</p><p></p><p></p><p></p><p>Chcesz dowiedzieć się więcej o działalności <strong>[nazwa organizacji związkowej ]</strong>? Odwiedź nasze profile w <a target="_blank" rel="noopener noreferrer nofollow" href="https://form-generator-test.sliplane.app/forms/698e367c2d3cca1353991f60/wwww">media społecznościowe</a>.</p><p></p><p>Osoby zainteresowane wstąpieniem do <strong>[nazwa organizacji związkowej] </strong>prosimy o kontakt telefoniczny: <strong>[nr telefonu] </strong>lub e-mailowy: <strong>[adres e-mail]</strong>.</p>',
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 3,
      },
    ],
    state: "template",
    type: FormType.Inspector,
    resultVisibility: FormResultVisibility.Secret,
    displayAuthorEmail: true,
    headerFileId: "698f67880746dc0289059e74",
  },
  {
    id: TemplateFormId.STRIKE,
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
    headerFileId: "698e38ca2d3cca1353991f62",
  },
  {
    id: TemplateFormId.ELECTIONS,
    title: "Wybory prezydium komisji w [nazwa przedsiębiorstwa]",
    description:
      "<p>Weź udział w głosowaniu i wybierz osob, które zasiądą w prezydium komisji</p><p></p><p>Wybory odbywają się w dniach [daty].</p><p></p><p><strong>Uprawnione&nbsp;</strong>do głosowania&nbsp;<strong>są</strong>&nbsp;wyłącznie osoby zatrudnione przez <strong>[nazwa przedsiębiorstwa]</strong>.<strong>&nbsp;</strong></p><p>Wybory są anonimowe.</p>",
    ...getCreatedUpdatedDates(),
    inputs: [
      {
        id: "elections-1",
        type: InputType.SINGLE_SELECT,
        header:
          "Wybierz swojego kandydata na Przewodniczącego/Przewodniczącą prezydium komisji",
        validation: {},
        options: [
          {
            value: "elections-1-82284",
            label: "Jan",
          },
          {
            value: "elections-1-43992",
            label: "Maria",
          },
          {
            value: "elections-1-51557",
            label: "Tomasz",
          },
          {
            value: "elections-1-428",
            label: "Mariola",
          },
        ],
        required: true,
        unique: false,
        hidden: false,
        order: 0,
      },
      {
        id: "elections-2",
        type: InputType.PARAGRAPH,
        header: "",
        description:
          "<p><strong>Każdy uprawniony pracownik może oddać jeden głos.</strong></p>",
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 1,
      },
      {
        id: "elections-3",
        type: InputType.NUMBER,
        header:
          "W celu weryfikacji głosu przez [nazwa organizacji związkowej] podaj Swój numer identyfikatora pracowniczego.",
        description:
          '<p>Każdy identyfikator może zostać użyty <mark class="bg-accent">tylko raz</mark>. Ponowne wprowadzenie tych<strong> </strong>samych danych uniemożliwi wysłanie formularza.</p>',
        validation: {},
        options: [],
        required: true,
        unique: true,
        hidden: true,
        order: 2,
      },
      {
        id: "elections-4",
        type: InputType.PARAGRAPH,

        header: "",
        description:
          '<p>Wyniki głosowania zostaną ogłoszone [metoda ogłoszenia wyników].</p><p></p><p></p><p></p><p>Chcesz dowiedzieć się więcej o działalności <strong>[nazwa organizacji związkowej ]</strong>? Odwiedź nasze profile w <a target="_blank" rel="noopener noreferrer nofollow" href="https://form-generator-test.sliplane.app/forms/698e367c2d3cca1353991f60/wwww">media społecznościowe</a>.</p><p></p><p>Osoby zainteresowane wstąpieniem do <strong>[nazwa organizacji związkowej] </strong>prosimy o kontakt telefoniczny: <strong>[nr telefonu] </strong>lub e-mailowy: <strong>[adres e-mail]</strong>.</p>',
        validation: {},
        options: [],
        required: false,
        unique: false,
        hidden: false,
        order: 3,
      },
    ],
    state: "template",
    type: FormType.Survey,
    resultVisibility: FormResultVisibility.Secret,
    displayAuthorEmail: true,
  },
];
