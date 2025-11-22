import { GroupedAnswer, ResultAnswer } from "@/types/result";
import PieChart from "./charts/PieChart";

const AnswerResults = (result: GroupedAnswer) => {
  const { answers, header, id } = result

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
      <PieChart
       data={mappedAnswers}
      />
    </div>
  );
};

export default AnswerResults;
