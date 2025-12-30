import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import jsPDF from "jspdf";
import { robotoBold, robotoRegular } from "./fonts";

export const getPdfWidth = (pdf: jsPDF): number =>
  pdf.internal.pageSize.getWidth();

export const setFontFamilyRegular = (pdf: jsPDF): void => {
  pdf.setFont("RobotoRegular");
};

export const setFontFamilyBold = (pdf: jsPDF): void => {
  pdf.setFont("RobotoBold");
};

export const addOzzipLogo = (pdf: jsPDF): void => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src =
    "https://mlodzi.ozzip.pl/img/9b7922d9-f1dc-431e-a55d-1f5b63ebd5bf.png";
  pdf.addImage(img, "PNG", getPdfWidth(pdf) - 50, 0, 50, 50);
};

export const drawHeader = (pdf: jsPDF): void => {
  pdf.setFillColor("#c53030");
  pdf.rect(0, 0, getPdfWidth(pdf), 50, "F");
};

export const addHeaderText = (title: string, pdf: jsPDF): void => {
  setFontFamilyBold(pdf);

  pdf.setFontSize(35);
  pdf.text(title, 10, 30);

  setFontFamilyRegular(pdf);
  pdf.setFontSize(12);
  pdf.text(
    `(wyniki wygenerowano: ${formatDateAndTime(new Date().toISOString())})`,
    10,
    42
  );
};

export const addPageHeader = (title: string, pdf: jsPDF): void => {
  drawHeader(pdf);
  addOzzipLogo(pdf);
  addHeaderText(title, pdf);
};

export const addFonts = (pdf: jsPDF): void => {
  pdf.addFileToVFS("RobotoRegular-normal.ttf", robotoRegular);
  pdf.addFileToVFS("RobotoRegular-bold.ttf", robotoBold);
  pdf.addFont("RobotoRegular-normal.ttf", "RobotoRegular", "normal");
  pdf.addFont("RobotoRegular-bold.ttf", "RobotoBold", "normal");
};
