"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/shared";
import { GroupedAnswer } from "@/types/result";
import AnswerResults from "./AnswerResults";
import { FormInput, FormInputSelectable } from "@/types/input";
import ResultFieldSelect from "./ResultFieldSelect";

type Props = {
  inputs: FormInput[]
  displayResults: (selectedInputIds: string[]) => Promise<GroupedAnswer[]>
}

const Results = (props: Props) => {
  const [results, setResults] = useState<GroupedAnswer[]>([])
  const [inputs, setInputs] = useState<FormInputSelectable[]>(
    props.inputs.map((el) => ({...el, selected: true}))
  )

  const onDisplayAnswers = async () => {
    const inputIds = inputs
      .filter(({ selected }) => selected)
      .map(({ id }) => id!)
    const groupedResults = await props.displayResults(inputIds)
    setResults(groupedResults)
  }

  const setSelectedInputs = (inputData: FormInputSelectable[]) => {
    setInputs(inputData)
  }

  return (
    <div className="p-8">
      <ResultFieldSelect
        {...{inputs, setSelectedInputs}}
      />

      <Button
        onClickAction={onDisplayAnswers}
        message="Pokaz wyniki"
        className="!w-auto my-4"
      />
      
      <div>
        {results.map((result, i) => (
          <AnswerResults
            {...result}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
