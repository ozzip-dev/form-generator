"use client"

import { useState } from "react";
import { Button } from "@/components/shared";
import { GroupedAnswer } from "@/types/result";
import AnswerResults from "./AnswerResults";

type Props = {
  displayResults: () => Promise<GroupedAnswer[]>
}

const Results = (props: Props) => {
  const [results, setResults] = useState<GroupedAnswer[]>([])

  const onDisplayAnswers = async () => {
    const groupedResults = await props.displayResults()
    setResults(groupedResults)
  }

  return (
    <>
      {/* TODO: add exclude fields select */}
      <Button
        onClickAction={onDisplayAnswers}
        message="Odswiez wyniki"
        className="!w-auto"
      />
      
      <div className="p-8">
        {results.map((result, i) => (
          <AnswerResults
            {...result}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
