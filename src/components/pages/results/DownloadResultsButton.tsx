"use client";

import { makeXlsDownloadData } from "@/actions/results/makeResultsXlsData";
import { Button } from "@/components/shared";
import { downloadFile } from "@/lib/utils";

type Props = {
  inputHeaders: string[];
  submissionValues: string[][];
  formTitle?: string;
};

const DownloadResultsButton = (props: Props) => {
  const getFileName = () =>
    `${(props.formTitle || "forumlarz").trim().replaceAll(" ", "_")}_wyniki`;

  const downloadXls = (data: Buffer<ArrayBufferLike>) => {
    const type =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const blob = new Blob([data as BlobPart], { type });
    const fileName = getFileName();
    downloadFile(blob, fileName);
  };

  const downloadResults = async () => {
    const xlsData = await makeXlsDownloadData(
      props.inputHeaders,
      props.submissionValues,
    );
    downloadXls(xlsData);
  };

  return (
    <Button
      message="Pobierz wyniki (.xls)"
      onClickAction={downloadResults}
      variant="primary-rounded"
    />
  );
};

export default DownloadResultsButton;
