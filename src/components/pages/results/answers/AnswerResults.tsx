import { GroupedAnswer } from "@/types/result";
import AnswersDisplayed from "./AnswersDisplayed";
import { isInputTypeCheckbox } from "@/helpers/inputHelpers";
import { FormInput } from "@/types/input";
import { Button } from "@/components/shared";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  addFonts,
  addFooter,
  addInputName,
  addInputPageHeader,
  addNumberedPageHeader,
  getPdfWidth,
} from "../utils";

type Props = {
  result: GroupedAnswer;
  title: string;
  idx: number;
};

const AnswerResults = (props: Props) => {
  const { answers, header, type, id } = props.result;
  const sortedAnswers = answers.sort((a, b) => b.count - a.count);

  const isCheckbox = isInputTypeCheckbox({ type } as FormInput);

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
      }).then(async (canvas) => {
        const pdf = new jsPDF({ unit: "px" });
        addFonts(pdf);
        const pageWidth = getPdfWidth(pdf);
        const pageHeight = pdf.internal.pageSize.getHeight();
        const chartWidth = pageWidth * 0.65;
        const chartLeft = (pageWidth - chartWidth) / 2;
        const imgWidth = chartWidth;
        const firstPageYOffset = 100;
        const nextPagesYOffset = 110;
        const numberedHeaderTop = 14;
        const numberedHeaderSize = 50;
        const numberedHeaderMetadataBottomOffset = 8;
        const bottomMargin = 20;
        const availableHeight = pageHeight - nextPagesYOffset - bottomMargin;
        const scaleRatio = imgWidth / canvas.width;
        const maxSliceHeight = Math.floor(availableHeight / scaleRatio);
        const pageCount = Math.max(
          1,
          Math.ceil(canvas.height / maxSliceHeight),
        );
        const recordCount = sortedAnswers.length;

        let sourceY = 0;
        let isFirstPage = true;
        let page = 1;

        while (sourceY < canvas.height) {
          if (!isFirstPage) {
            pdf.addPage();
          }

          const currentYOffset = isFirstPage
            ? firstPageYOffset
            : nextPagesYOffset;

          const remainingHeight = canvas.height - sourceY;
          const sliceHeight = Math.min(maxSliceHeight, remainingHeight);

          if (pageCount > 1) {
            const recordFrom =
              recordCount > 0
                ? Math.min(
                    recordCount,
                    Math.floor((sourceY / canvas.height) * recordCount) + 1,
                  )
                : 0;
            const recordTo =
              recordCount > 0
                ? Math.min(
                    recordCount,
                    Math.ceil(
                      ((sourceY + sliceHeight) / canvas.height) * recordCount,
                    ),
                  )
                : 0;

            addNumberedPageHeader(
              props.title,
              pdf,
              page,
              pageCount,
              recordFrom,
              recordTo,
              recordCount,
              numberedHeaderTop,
              numberedHeaderSize,
              numberedHeaderMetadataBottomOffset,
            );
          } else {
            addInputPageHeader(props.title, pdf);
          }
          addInputName(header, pdf);

          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;

          const pageContext = pageCanvas.getContext("2d");
          if (!pageContext) {
            break;
          }

          pageContext.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight,
          );

          const sliceImgData = pageCanvas.toDataURL("image/png");
          const renderedSliceHeight = sliceHeight * scaleRatio;

          pdf.addImage(
            sliceImgData,
            "PNG",
            chartLeft,
            currentYOffset,
            imgWidth,
            renderedSliceHeight,
            undefined,
            "FAST",
          );

          sourceY += sliceHeight;
          isFirstPage = false;
          page += 1;
        }

        const totalPages = pdf.getNumberOfPages();
        for (let pageIndex = 1; pageIndex <= totalPages; pageIndex += 1) {
          pdf.setPage(pageIndex);
          await addFooter(pdf);
        }

        pdf.save(`Wyniki_${props.title}_${header}.pdf`);
        document.body.removeChild(wrapper);
      });
    });
  };
  return (
    <>
      <div className="mb-sm flex items-center justify-between gap-2 font-semibold">
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
