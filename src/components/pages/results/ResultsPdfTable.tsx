"use client";

import { Button } from "@/components/shared";
import jsPDF from "jspdf";
import { autoTable, RowInput } from "jspdf-autotable";
import dynamic from "next/dynamic";
import { addFonts, addNumberedPageHeader, setFontFamilyRegular } from "./utils";

type Props = {
  title: string;
  inputHeaders: string[];
  submissionValues: string[][];
};

const ResultsPdfTable = dynamic(
  async () => {
    return function Results(props: Props) {
      function getResolvedGridColumnWidths(gridEl: HTMLElement) {
        const styles = window.getComputedStyle(gridEl);

        return styles.gridTemplateColumns.split(" ").map((v) => parseFloat(v));
      }

      function extractGridData(gridEl: HTMLElement, columnCount: number) {
        const cells = [...gridEl.children];
        const rows = [];

        for (let i = 0; i < cells.length; i += columnCount) {
          rows.push(
            cells
              .slice(i, i + columnCount)
              .map((cell) => cell.textContent.trim())
          );
        }

        return rows;
      }

      const PX_TO_MM = 25.4 / 96;

      function pxToMm(px: number) {
        return px * PX_TO_MM;
      }

      function buildColumnStyles(widthsPx: number[]) {
        return Object.fromEntries(
          widthsPx.map((w, idx) => [idx, { cellWidth: pxToMm(w) }])
        );
      }

      function exportGridToPDF() {
        const gridEl = document.getElementById("results");
        if (!gridEl) return;

        const pdf = new jsPDF("landscape", "mm", "a4");
        addFonts(pdf);
        setFontFamilyRegular(pdf);

        const columnWidthsPx = getResolvedGridColumnWidths(gridEl);
        const columnCount = columnWidthsPx.length;

        const data = extractGridData(gridEl, columnCount);
        const head = [data.shift()] as RowInput[];
        const body = data;

        const rowsPerPage: Record<number, number[]> = {};

        autoTable(pdf, {
          head,
          body,
          styles: { font: "RobotoRegular", fontSize: 9 },
          headStyles: {
            cellWidth: "wrap",
            overflow: "visible",
            font: "RobotoBold",
            fillColor: "#4a4a4a",
          },
          columnStyles: buildColumnStyles(columnWidthsPx),
          margin: { top: 25, left: 0.2 },

          rowPageBreak: "avoid",

          willDrawCell: (data) => {
            if (data.section === "body") {
              const page = data.pageNumber;
              rowsPerPage[page] ??= [];
              if (!rowsPerPage[page].includes(data.row.index))
                rowsPerPage[page].push(data.row.index);
            }
          },
        });

        console.log(rowsPerPage);

        const totalPages = pdf.getNumberOfPages();
        const totalRecords = body.length;

        Object.entries(rowsPerPage).forEach(([pageStr, rows]) => {
          const page = Number(pageStr);

          const firstRecord = rows[0] + 1;
          const lastRecord = rows[rows.length - 1] + 1;

          pdf.setPage(page);
          pdf.setFontSize(9);

          addNumberedPageHeader(
            props.title,
            pdf,
            page,
            totalPages,
            firstRecord,
            lastRecord,
            totalRecords
          );
        });

        pdf.save("grid-table.pdf");
      }
      return (
        <>
          <div
            id="results"
            className="grid justify-start gap-4 w-full"
            style={{
              gridTemplateColumns: `repeat(${props.inputHeaders.length},minmax(70px,auto))`,
            }}
          >
            {props.inputHeaders.map((header, idx) => (
              <div key={idx}>{header}</div>
            ))}
            {props.submissionValues.flat().map((value, idx) => (
              <div key={`val-${idx}`}>{value}</div>
            ))}
          </div>
          <Button
            onClickAction={exportGridToPDF}
            message="PDF"
            className="!w-auto my-4"
          />
        </>
      );
    };
  },
  { ssr: false }
);

export default function ResultsPdfTableClient(args: Props) {
  return <ResultsPdfTable {...args} />;
}
