"use server";

import { exportXls } from "@/services/xls-service";

export async function makeXlsDownloadData(
  inputHeaders: string[],
  submissionValues: string[][]
) {
  const xlsData = await exportXls("Wyniki", [
    inputHeaders,
    ...submissionValues,
  ]);
  return xlsData;
}
