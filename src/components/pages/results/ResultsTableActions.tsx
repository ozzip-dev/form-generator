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
    <div className="fixed bottom-0 left-1/2 mb-8 flex -translate-x-1/2 gap-md">
      <Button onClickAction={exportGridToPDF} variant="primary-rounded">
        {" "}
        Pobierz wyniki (.pdf)
      </Button>

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
