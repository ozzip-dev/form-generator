"use client";

import { Button, Card } from "@/components/shared";
import SectionHeader from "@/components/shared/SectionHeader";
import { FormType } from "@/enums/form";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { FormInput, FormInputSelectable } from "@/types/input";
import { DiagramType, GroupedAnswer } from "@/types/result";
import { useState } from "react";
import { AnswerResults } from "./answers";
import ResultFieldSelect from "./ResultFieldSelect";

type Props = {
  submissionNumber: number;
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
          className="my-6"
          message={
            <>
              <div className="flex gap-6">
                <div>{title}</div>
                <div className="flex-shrink-0 font-[var(--fw-base)]">
                  ({props.submissionNumber} wyników)
                </div>
              </div>
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
