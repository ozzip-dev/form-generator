import { DiagramType, GroupedAnswer } from "@/types/result";
import { BarChart, PieChart } from "../charts";
import AnswersDisplayed from "./AnswersDisplayed";
import { isInputTypeCheckbox } from "@/helpers/inputHelpers";
import { FormInput } from "@/types/input";

type Props = {
  result: GroupedAnswer;
  diagrams: DiagramType[];
};

// TODO Pawel: jak ustalimy jak sie wyswietli wyniki:
// 1. wspolny komponent dla selectow
// 2. ulozyc inaczej selecty, reaktywnosc
const AnswerResults = (props: Props) => {
  const { answers, header, type } = props.result;
  const sortedAnswers = answers.sort((a, b) => b.count - a.count);

  const mappedAnswers = sortedAnswers.map(({ answer, count }) => ({
    value: count,
    label: answer,
  }));

  const diagramIds: string[] = props.diagrams
    .filter(({ selected }) => selected)
    .map(({ value }) => value);

  const isCheckbox = isInputTypeCheckbox({ type } as FormInput);
  const isDiagramSelected = (id: string) => diagramIds.includes(id);

  const charts = [
    {
      id: "pieChart",
      Component: PieChart,
      isDisplayed: !isCheckbox,
    },
    {
      id: "barChart",
      Component: BarChart,
      isDisplayed: true,
      props: { type },
    },
  ];

  return (
    <div className=" flex gap-8 mb-4">
      <div>
        <div className="font-black">{header}</div>
        <AnswersDisplayed {...{ answers: sortedAnswers, isCheckbox }} />
      </div>

      {charts
        .filter(({ id, isDisplayed }) => isDisplayed && isDiagramSelected(id))
        .map(({ Component, id, props = {} }) => (
          <Component key={id} data={mappedAnswers} {...props} />
        ))}
    </div>
  );
};

export default AnswerResults;
