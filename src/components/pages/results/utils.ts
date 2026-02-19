import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import jsPDF from "jspdf";
import { robotoBold, robotoRegular } from "./fonts";

export const getPdfWidth = (pdf: jsPDF): number =>
  pdf.internal.pageSize.getWidth();

export const setFontFamilyRegular = (pdf: jsPDF): void => {
  pdf.setFont("RobotoRegular", "normal");
};

export const setFontFamilyBold = (pdf: jsPDF): void => {
  pdf.setFont("RobotoBold", "bold");
};

export const addOzzipLogo = (pdf: jsPDF, size: number = 20): void => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src =
    "https://mlodzi.ozzip.pl/img/9b7922d9-f1dc-431e-a55d-1f5b63ebd5bf.png";
  pdf.addImage(img, "PNG", getPdfWidth(pdf) - size, 0, size, size);
};

export const drawHeader = (pdf: jsPDF, size: number = 20): void => {
  pdf.setFillColor("#c7c7c7");
  pdf.rect(0, 0, getPdfWidth(pdf), size, "F");
};

export const addHeaderText = (title: string, pdf: jsPDF): void => {
  setFontFamilyBold(pdf);

  pdf.setFontSize(25);
  pdf.text(title, 5, 25);

  setFontFamilyRegular(pdf);
  pdf.setFontSize(11);
  pdf.text(
    `(wyniki wygenerowano: ${formatDateAndTime(new Date().toISOString())})`,
    5,
    40,
  );
};

export const addInputPageHeader = (title: string, pdf: jsPDF): void => {
  drawHeader(pdf, 50);
  // addOzzipLogo(pdf, 50);
  addHeaderText(title, pdf);
};

export const addInputName = (inputName: string, pdf: jsPDF): void => {
  pdf.setFontSize(15);
  pdf.text(`Wyniki dla pola: ${inputName}`, 5, 70);
};

export const addNumberedHeaderText = (
  title: string,
  pdf: jsPDF,
  page: number,
  pageCount: number,
  recordFrom: number,
  recordTo: number,
  recordCount: number,
): void => {
  setFontFamilyBold(pdf);

  pdf.setFontSize(22);
  pdf.text(title, 5, 10);

  setFontFamilyRegular(pdf);
  pdf.setFontSize(11);
  pdf.text(
    `wyniki wygenerowano: ${formatDateAndTime(
      new Date().toISOString(),
    )}                        strona: (${page}/${pageCount})                        wyniki: ${recordFrom}-${recordTo}/${recordCount}`,
    5,
    17,
  );
};

export const addNumberedPageHeader = (
  title: string,
  pdf: jsPDF,
  page: number,
  pageCount: number,
  recordFrom: number,
  recordTo: number,
  recordCount: number,
): void => {
  drawHeader(pdf);
  // addOzzipLogo(pdf);
  addNumberedHeaderText(
    title,
    pdf,
    page,
    pageCount,
    recordFrom,
    recordTo,
    recordCount,
  );
};

export const addFonts = (pdf: jsPDF): void => {
  pdf.addFileToVFS("RobotoRegular-normal.ttf", robotoRegular);
  pdf.addFileToVFS("RobotoRegular-bold.ttf", robotoBold);
  pdf.addFont("RobotoRegular-normal.ttf", "RobotoRegular", "normal");
  pdf.addFont("RobotoRegular-bold.ttf", "RobotoBold", "bold");
};

/* PDF size, margins */
export const MARGIN_H = 0.2;
export const MARGIN_IMG = 60;
const MARGINS = MARGIN_H * 2;
const PX_TO_MM = 25.4 / 96;

const getPageWidth = (pdf: jsPDF): number => pdf.internal.pageSize.getWidth();

export const getAvailablePageWidth = (pdf: jsPDF): number =>
  getPageWidth(pdf) - MARGINS;

export const pxToMm = (px: number): number => px * PX_TO_MM;
