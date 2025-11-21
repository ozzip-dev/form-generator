"use client"

import { useState } from "react";
import { Button } from "@/components/shared";
import { getAnonymousAnswers, getGroupedAnswersResults } from "@/lib/results";
import { FormInput } from "@/types/input";
import { Answers, GroupedAnswer, ResultAnswer, Submission } from "@/types/result";

type Props = {
  inputs: FormInput[]
  submissions: Submission[]
}

const Results = (props: Props) => {
  const [results, setResults] = useState<GroupedAnswer[]>([])

  const onDisplayAnswers = async () => {
    const answers: Answers[] = getAnonymousAnswers(props.submissions)

    const groupedResults: GroupedAnswer[] = getGroupedAnswersResults(props.inputs, answers)
    setResults(groupedResults)
  }

  const getAnswerPercentage = (answerText: string, answers: ResultAnswer[]): string => {
    const allAnswerCount = answers.map(({ count }) => count).reduce((a, b) => a + b)
    const sameAnswerCount = answers.find(({ answer }) => answer == answerText)?.count
    return `${((sameAnswerCount / allAnswerCount) * 100).toFixed(2)}%`
  }

  return (
    <>
      {/* TODO: add exclude fields select */}
      <Button
        onClickAction={onDisplayAnswers}
        message="Odswiez wyniki"
      />
      
      <div>Liczba submitów: {props.submissions.length}</div>
      
      <div>
        {results.map(({ header, answers }, i) => (
          <div key={i}>
            <div className="font-black">{header}</div>
            {answers.map(({ answer, count }, index) => (
              <div key={index}>{answer} ({count}) - {getAnswerPercentage(answer, answers)}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
