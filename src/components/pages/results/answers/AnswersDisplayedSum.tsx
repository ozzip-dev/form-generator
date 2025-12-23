import { ResultAnswer } from "@/types/result";

type Props = {
  answers: ResultAnswer[];
};

const AnswersDisplayedSum = (props: Props) => {
  const getCheckboxAnswerDisplay = (
    answers: ResultAnswer[]
  ): ResultAnswer[] => {
    const uniqueAnswers = [
      ...new Set(answers.map(({ answer, count }) => `${answer};${count}`)),
    ];
    const mappedAnwers = uniqueAnswers.map((item) => {
      const [answer, count] = item.split(";");
      return { answer, count: Number(count) };
    });
    return mappedAnwers;
  };

  return (
    <div>
      {getCheckboxAnswerDisplay(props.answers).map(({ answer, count }, idx) => (
        <div key={idx}>{`${answer}: ${count}`}</div>
      ))}
    </div>
  );
};

export default AnswersDisplayedSum;
