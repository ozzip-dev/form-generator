"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/shared";
import { DiagramType, GroupedAnswer } from "@/types/result";
import { AnswerResults } from "./answers";
import { FormInput, FormInputSelectable } from "@/types/input";
import ResultFieldSelect from "./ResultFieldSelect";
import ResultDiagramSelect from "./ResultDiagramSelect";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormType } from "@/enums/form";
import { dataSelectOptions } from "../edit-form/editFormData";
import {
  addFonts,
  addPageHeader,
  getPdfWidth,
  setFontFamilyBold,
  setFontFamilyRegular,
} from "./utils";

type Props = {
  inputs: FormInput[];
  displayResults: (
    selectedInputIds: string[]
  ) => Promise<{ results: GroupedAnswer[]; submissionCount: number }>;
  formData: {
    title: string;
    description: string;
    type: FormType | "";
    createdAt: string;
  };
};

export const diagramTypes: DiagramType[] = [
  {
    value: "pieChart",
    label: "Diagram kołowy",
    selected: true,
  },
  {
    value: "barChart",
    label: "Diagram słupkowy",
    selected: true,
  },
];

// TODO: refactor!
// Wydzielic funkcje do renderowania elementow, poczekac na ustalony design,
// raczej podzielic na jeden inpupt - jedna strona.
// zmienic odstepy w px na zmienne
const Results = (props: Props) => {
  const [displayedResults, setDisplayedResults] = useState<{
    results: GroupedAnswer[];
    submissionCount: number;
  }>({ results: [], submissionCount: 0 });
  const [diagrams, setDiagrams] = useState<DiagramType[]>(diagramTypes);
  const [inputs, setInputs] = useState<FormInputSelectable[]>(
    props.inputs.map((el) => ({ ...el, selected: true }))
  );

  const { title, description, createdAt, type } = props.formData;

  const onDisplayAnswers = async () => {
    const inputIds = inputs
      .filter(({ selected }) => selected)
      .map(({ id }) => id!);
    const { results, submissionCount } = await props.displayResults(inputIds);
    setDisplayedResults({ results, submissionCount });
  };

  const addFormDetailsText = (pdf: jsPDF): void => {
    setFontFamilyBold(pdf);

    pdf.setFontSize(30);
    pdf.text("Dane formularza", 10, 95);

    setFontFamilyRegular(pdf);
    pdf.setFontSize(20);
    pdf.text(
      [
        `nazwa: ${title}`,
        `opis: ${description}`,
        `utworzono: ${formatDateAndTime(createdAt)}`,
      ],
      10,
      115
    );

    setFontFamilyBold(pdf);
    pdf.setFontSize(30);
    pdf.text("Szczegóły", 10, 200);

    setFontFamilyRegular(pdf);
    pdf.setFontSize(20);
    pdf.text([`Pola formularza (${inputs.length}):`], 10, 220);
    inputs.forEach((input, idx) => {
      const inputType = dataSelectOptions.find(
        ({ value }) => value == input.type
      )?.label;
      pdf.text(`${input.header} (${inputType})`, 10, 240 + idx * 20);
    });

    pdf.text(
      `Liczba wysłanych odpowiedzi: ${displayedResults.submissionCount}`,
      10,
      240 + inputs.length * 20 + 40
    );
  };

  const exportPdf = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    html2canvas(document.querySelector("#results")!).then((canvas) => {
      const pdf = new jsPDF({
        unit: "px",
      });
      addFonts(pdf);

      /* title page */
      addPageHeader(title, pdf);
      addFormDetailsText(pdf);

      /* results page */
      const imgData = canvas.toDataURL("image/png");
      pdf.addPage();
      addPageHeader(title, pdf);
      pdf.addImage(imgData, "PNG", 0, 80, getPdfWidth(pdf), 0, "SLOW");

      pdf.save("download.pdf");
    });
  };

  return (
    <div className="p-8">
      <div>
        <div className="text-xl">
          <span className="font-bold">Tytuł formularza: </span>
          {title}
        </div>
      </div>
      <div className=" w-fit p-4 border">
        <ResultFieldSelect {...{ inputs, setInputs }} />

        <Button
          onClickAction={onDisplayAnswers}
          message="Wyświetl odpowiedzi"
          className="!w-auto my-4"
        />
      </div>

      <div className="w-fit mt-4 p-4 border">
        <ResultDiagramSelect {...{ diagrams, setDiagrams }} />

        <Button
          onClickAction={exportPdf}
          message="Pobierz"
          className="!w-auto my-4"
          disabled={!displayedResults.results.length}
        />
      </div>

      <div id="results" className="w-fit p-4">
        {displayedResults.results.map((result, i) => (
          <AnswerResults {...{ result, diagrams }} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Results;
