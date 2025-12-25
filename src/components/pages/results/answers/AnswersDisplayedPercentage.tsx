import { ResultAnswer } from "@/types/result";

type Props = {
  answers: ResultAnswer[];
};

const AnswersDisplayedPercentage = (props: Props) => {
  const getAnswerPercentage = (
    answerText: string,
    answers: ResultAnswer[]
  ): string => {
    const allAnswerCount = answers
      .map(({ count }) => count)
      .reduce((a, b) => a + b);
    const sameAnswerCount = answers.find(({ answer }) => answer == answerText)
      ?.count!;
    return `${((sameAnswerCount / allAnswerCount) * 100).toFixed(2)}%`;
  };

  const getAnswerDisplay = (
    answers: ResultAnswer[],
    answer: string,
    count: number
  ) => `${answer} (${count}) - ${getAnswerPercentage(answer, answers)}`;

  return (
    <div>
      {props.answers.map(({ answer, count }, index) => (
        <div key={index}>{getAnswerDisplay(props.answers, answer, count)}</div>
      ))}
    </div>
  );
};

export default AnswersDisplayedPercentage;
