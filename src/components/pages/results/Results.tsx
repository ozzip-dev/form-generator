"use client";

import { useState } from "react";
import { Button } from "@/components/shared";
import { DiagramType, GroupedAnswer } from "@/types/result";
import { AnswerResults } from "./answers";
import { FormInput, FormInputSelectable } from "@/types/input";
import ResultFieldSelect from "./ResultFieldSelect";
import { FormType } from "@/enums/form";

type Props = {
  inputs: FormInput[];
  displayResults: (
    selectedInputIds: string[],
  ) => Promise<{ results: GroupedAnswer[]; submissionCount: number }>;
  formData: {
    title: string;
    description: string;
    type: FormType | "";
    createdAt: string;
  };
};

export const diagramTypes: DiagramType[] = [
  {
    value: "pieChart",
    label: "Diagram kołowy",
    selected: true,
  },
  {
    value: "barChart",
    label: "Diagram słupkowy",
    selected: true,
  },
];

const Results = (props: Props) => {
  const [displayedResults, setDisplayedResults] = useState<{
    results: GroupedAnswer[];
    submissionCount: number;
  }>({ results: [], submissionCount: 0 });
  const [diagrams, setDiagrams] = useState<DiagramType[]>(diagramTypes);
  const [inputs, setInputs] = useState<FormInputSelectable[]>(
    props.inputs.map((el) => ({ ...el, selected: true })),
  );

  const { title } = props.formData;

  const onDisplayAnswers = async () => {
    const inputIds = inputs
      .filter(({ selected }) => selected)
      .map(({ id }) => id!);
    const { results, submissionCount } = await props.displayResults(inputIds);
    setDisplayedResults({ results, submissionCount });
  };

  return (
    <div className="p-8">
      <div>
        <div className="text-xl">
          <span>Tytuł formularza: </span>
          <span className="font-bold">{title}</span>
        </div>
      </div>
      <div className="w-fit p-4 border rounded-sm">
        <ResultFieldSelect {...{ inputs, setInputs }} />

        <Button
          onClickAction={onDisplayAnswers}
          message="Wyświetl odpowiedzi"
          className="!w-auto my-4"
        />
      </div>

      <div id="results" className="w-fit p-4">
        {displayedResults.results.map((result, i) => (
          <AnswerResults {...{ result, diagrams, title }} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Results;
