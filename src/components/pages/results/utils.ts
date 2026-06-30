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

export const addformTitleText = (
  pdf: jsPDF,
  title: string,
  top: number,
): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 5;
  const maxWidth = pageWidth - margin * 2;

  pdf.setFontSize(13.5);
  pdf.text(title, 5, top, { maxWidth: maxWidth });
};

export const addHeaderText = (title: string, pdf: jsPDF): void => {
  setFontFamilyBold(pdf);

  addformTitleText(pdf, title, 16);

  setFontFamilyRegular(pdf);
  pdf.setFontSize(11);
  pdf.text(
    `plik wygenerowany automatycznie: ${formatDateAndTime(new Date().toISOString())}`,
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
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 5;
  const maxWidth = pageWidth - margin * 2;

  pdf.setFontSize(15);
  pdf.text(`Wyniki dla pola: ${inputName}`, 5, 70, { maxWidth });
};

export const addNumberedHeaderText = (
  title: string,
  pdf: jsPDF,
  page: number,
  pageCount: number,
  recordFrom: number,
  recordTo: number,
  recordCount: number,
  top: number = 6,
  headerSize: number = 20,
  metadataBottomOffset: number = 3,
): void => {
  setFontFamilyBold(pdf);

  addformTitleText(pdf, title, top);

  setFontFamilyRegular(pdf);
  pdf.setFontSize(11);
  pdf.text(
    `plik wygenerowany automatycznie: ${formatDateAndTime(
      new Date().toISOString(),
    )}                        strona: ${page}/${pageCount}                        wyniki: ${recordFrom}-${recordTo}/${recordCount}`,
    5,
    headerSize - metadataBottomOffset,
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
  top?: number,
  headerSize: number = 20,
  metadataBottomOffset?: number,
): void => {
  drawHeader(pdf, headerSize);
  // addOzzipLogo(pdf);
  addNumberedHeaderText(
    title,
    pdf,
    page,
    pageCount,
    recordFrom,
    recordTo,
    recordCount,
    top,
    headerSize,
    metadataBottomOffset,
  );
};

const pxToPdfUnit = (pdf: jsPDF, px: number): number => {
  const pointsPerPx = 72 / 96;
  return (px * pointsPerPx) / pdf.internal.scaleFactor;
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });

export const addFooter = async (pdf: jsPDF): Promise<void> => {
  const iconHeightPx = 25;
  const marginPx = 8;

  const iconHeight = pxToPdfUnit(pdf, iconHeightPx);
  const rightMargin = pxToPdfUnit(pdf, marginPx);
  const leftMargin = pxToPdfUnit(pdf, marginPx);
  const bottomMargin = pxToPdfUnit(pdf, marginPx);
  const websiteYOffset = pxToPdfUnit(pdf, marginPx);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const baselineY = pageHeight - bottomMargin;

  setFontFamilyRegular(pdf);
  pdf.setTextColor("#000000");
  pdf.setFontSize(14);
  pdf.text("www.formypracy.org", leftMargin, baselineY - websiteYOffset);

  try {
    const icon = await loadImage("/images/fp_logo.png");
    const ratio =
      icon.naturalHeight > 0 ? icon.naturalWidth / icon.naturalHeight : 1;
    const iconWidth = iconHeight * ratio;

    const startX = pageWidth - rightMargin - iconWidth;
    const iconY = baselineY - iconHeight;

    pdf.addImage(icon, "PNG", startX, iconY, iconWidth, iconHeight);
  } catch {
    console.log("failed to load footer logo");
  }
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
