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
    <div className="my-sm ml-sm flex gap-md">
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
