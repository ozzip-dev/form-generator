import { DiagramType, GroupedAnswer } from "@/types/result";
import { BarChart /*, PieChart */ } from "../charts";
import AnswersDisplayed from "./AnswersDisplayed";
import { isInputTypeCheckbox } from "@/helpers/inputHelpers";
import { FormInput } from "@/types/input";
import { Button } from "@/components/shared";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  addFonts,
  addInputName,
  addInputPageHeader,
  getPdfWidth,
  MARGIN_IMG,
} from "../utils";

type Props = {
  result: GroupedAnswer;
  diagrams: DiagramType[];
  title: string;
  idx: number;
};

const AnswerResults = (props: Props) => {
  const { answers, header, type, id } = props.result;
  const sortedAnswers = answers.sort((a, b) => b.count - a.count);

  const mappedAnswers = sortedAnswers.map(({ answer, count }) => ({
    value: count,
    label: answer,
  }));

  const diagramIds: string[] = props.diagrams
    .filter(({ selected }) => selected)
    .map(({ value }) => value);

  const isCheckbox = isInputTypeCheckbox({ type } as FormInput);
  const isDiagramSelected = (id: string) => diagramIds.includes(id);

  const charts = [
    // {
    //   id: "pieChart",
    //   Component: PieChart,
    //   isDisplayed: !isCheckbox,
    // },
    {
      id: "barChart",
      Component: BarChart,
      isDisplayed: true,
      props: { type },
    },
  ];

  // TODO Pawel: fix single input pdf display
  const exportPdf = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    html2canvas(document.querySelector(`#results-${id}`)!).then((canvas) => {
      const pdf = new jsPDF({
        unit: "px",
      });
      addFonts(pdf);

      addInputPageHeader(props.title, pdf);

      addInputName(header, pdf);

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(
        imgData,
        "PNG",
        MARGIN_IMG,
        90,
        getPdfWidth(pdf) - 2 * MARGIN_IMG,
        0,
        "SLOW",
      );

      pdf.save(`Wyniki_${props.title}_${header}.pdf`);
    });
  };
  return (
    <>
      <div className="mb-sm flex justify-between gap-2 font-bold">
        <div className={header ? "" : "text-error"}>
          <span className="mr-2">{props.idx + 1}.</span>
          {header ? header : "Brak pytania"}
        </div>

        <Button
          onClickAction={exportPdf}
          message="Pobierz .pdf"
          className="size-fit"
          variant="primary-rounded"
        />
      </div>

      <div id={`results-${id}`}>
        <AnswersDisplayed {...{ answers: sortedAnswers, isCheckbox }} />
      </div>
    </>
  );
};

export default AnswerResults;
