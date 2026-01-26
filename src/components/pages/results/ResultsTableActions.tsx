"use client";

import { Button } from "@/components/shared";
import DownloadResultsButton from "./DownloadResultsButton";

type Props = {
  title: string;
  inputHeaders: string[];
  submissionValues: string[][];
  exportGridToPDF: () => void;
};

const ResultsTableActions = ({
  inputHeaders,
  submissionValues,
  title,
  exportGridToPDF,
}: Props) => {
  return (
    <div className="flex gap-md mt-sm ml-sm">
      <Button
        onClickAction={exportGridToPDF}
        message="Pobierz wyniki (.pdf)"
        variant="primary-rounded"
      />

      <DownloadResultsButton
        {...{
          inputHeaders,
          submissionValues,
          title,
        }}
      />
    </div>
  );
};

export default ResultsTableActions;
