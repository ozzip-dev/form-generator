import { DiagramType, GroupedAnswer } from "@/types/result";
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

  const exportPdf = () => {
    const node = document.querySelector(`#results-${id}`);
    if (!node) return;

    const pdfPageWidthPx = 794;
    const chartWidthPx = Math.round(pdfPageWidthPx * 0.65);
    const clone = node.cloneNode(true) as HTMLElement;
    const wrapper = document.createElement("div");
    wrapper.appendChild(clone);
    wrapper.style.position = "absolute";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";
    wrapper.style.width = pdfPageWidthPx + "px";
    wrapper.style.background = "white";
    (clone as HTMLElement).style.width = chartWidthPx + "px";
    (clone as HTMLElement).style.margin = "0 auto";
    (clone as HTMLElement).style.display = "block";
    const labelNodes1 = (clone as HTMLElement).querySelectorAll(
      ".result-label",
    );
    const labelNodes2 = (clone as HTMLElement).querySelectorAll(
      ".result-answer",
    );
    [...labelNodes1, ...labelNodes2].forEach((el) => {
      (el as HTMLElement).style.paddingBottom = "8px";
    });

    document.body.appendChild(wrapper);

    function clean(node: HTMLElement) {
      if (node.classList) {
        node.classList.remove("invisible", "absolute");
      }
      Array.from(node.children).forEach((child) => clean(child as HTMLElement));
    }
    clean(clone);

    requestAnimationFrame(() => {
      html2canvas(clone as HTMLElement, {
        backgroundColor: "#fff",
        scale: 2,
        width: chartWidthPx,
        windowWidth: chartWidthPx,
      }).then((canvas) => {
        const pdf = new jsPDF({ unit: "px" });
        addFonts(pdf);
        addInputPageHeader(props.title, pdf);
        addInputName(header, pdf);
        const pageWidth = getPdfWidth(pdf);
        const chartWidth = pageWidth * 0.65;
        const chartLeft = (pageWidth - chartWidth) / 2;
        const imgWidth = chartWidth;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;
        const imgData = canvas.toDataURL("image/png");

        const yOffset = 100;
        pdf.addImage(
          imgData,
          "PNG",
          chartLeft,
          yOffset,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        pdf.save(`Wyniki_${props.title}_${header}.pdf`);
        document.body.removeChild(wrapper);
      });
    });
  };
  return (
    <>
      <div className="mb-sm flex items-center justify-between gap-2 font-bold">
        <div
          className={`result-label flex-1 truncate ${header ? "" : "text-error"}`}
        >
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
