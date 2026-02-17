"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@/components/shared";
import { DiagramType, GroupedAnswer } from "@/types/result";
import { AnswerResults } from "./answers";
import { FormInput, FormInputSelectable } from "@/types/input";
import ResultFieldSelect from "./ResultFieldSelect";
import { FormType } from "@/enums/form";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

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

  const [list, setList] = useState();

  const [diagrams, setDiagrams] = useState<DiagramType[]>(diagramTypes);
  const [inputs, setInputs] = useState<FormInputSelectable[]>(
    props.inputs.map((el) => ({ ...el, selected: true })),
  );

  const { title, createdAt } = props.formData;

  const onDisplayAnswers = async () => {
    const inputIds = inputs
      .filter(({ selected }) => selected)
      .map(({ id }) => id!);
    const { results, submissionCount } = await props.displayResults(inputIds);
    setDisplayedResults({ results, submissionCount });
  };

  return (
    <div className="container mb-16 py-4">
      <Card>
        <SectionHeader
          className="mx-8 my-6 min-w-max"
          message={
            <>
              <div>{title} </div>
              <div className="text-center text-2xs text-font_light sm:text-left">
                <span className="mr-1"> Opublikowany:</span>
                {formatDateAndTime(createdAt.toString())}
              </div>
            </>
          }
        />

        <ResultFieldSelect {...{ inputs, setInputs }} />
      </Card>

      <Button
        onClickAction={onDisplayAnswers}
        message="Wyświetl odpowiedzi"
        className="mx-auto my-12"
      />

      <div id="results" className="flex flex-col gap-4">
        {displayedResults.results.map((result, idx) => (
          <Card key={idx}>
            <AnswerResults {...{ result, diagrams, title, idx }} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
