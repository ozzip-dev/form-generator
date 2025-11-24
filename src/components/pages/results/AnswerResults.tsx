import { DiagramType, GroupedAnswer, ResultAnswer } from "@/types/result";
import { BarChart, PieChart } from "./charts";

type Props = {
  result: GroupedAnswer
  diagrams: DiagramType[]
}

// TODO Pawel: jak ustalimy jak sie wyswietli wyniki:
// 1. wspolny komponent dla selectow
// 2. ulozyc inaczej selecty, reaktywnosc
const AnswerResults = (props: Props) => {
  const { answers, header } = props.result

  const getAnswerPercentage = (answerText: string, answers: ResultAnswer[]): string => {
    const allAnswerCount = answers.map(({ count }) => count).reduce((a, b) => a + b)
    const sameAnswerCount = answers.find(({ answer }) => answer == answerText)?.count!
    return `${((sameAnswerCount / allAnswerCount) * 100).toFixed(2)}%`
  }

  const getAnswerDisplay = (
    answers: ResultAnswer[],
    answer: string,
    count: number
  ) => `${answer} (${count}) - ${getAnswerPercentage(answer, answers)}`

  const mappedAnswers = answers.map(({ answer, count }) => ({ value: count, label: answer }))
  const diagramIds: string[] = props.diagrams
    .filter(({ selected }) => selected)
    .map(({ value }) => value)
   
  const isDiagramSelected = (id: string) => (
    diagramIds.includes(id)
  )

  return (
    <div className=" flex gap-8 mb-4">
      <div>
        <div className="font-black">{header}</div>
        {answers
          .sort((a, b) => b.count - a.count)
          .map(({ answer, count }, index) => (
            <div key={index}>
              {getAnswerDisplay(answers, answer, count)}
            </div>
          )
        )}
      </div>

      {isDiagramSelected('pieChart') && <PieChart
        data={mappedAnswers}
      />}

      {isDiagramSelected('barChart') && <BarChart
        data={mappedAnswers}
      />}
    </div>
  );
};

export default AnswerResults;
