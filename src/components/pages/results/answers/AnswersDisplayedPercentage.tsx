// import { ResultAnswer } from "@/types/result";

// type Props = {
//   answers: ResultAnswer[];
// };

// const AnswersDisplayedPercentage = (props: Props) => {
//   const getAnswerPercentage = (
//     answerText: string,
//     answers: ResultAnswer[],
//   ): string => {
//     const allAnswerCount = answers
//       .map(({ count }) => count)
//       .reduce((a, b) => a + b);

//     const sameAnswerCount = answers.find(
//       ({ answer }) => answer == answerText,
//     )?.count!;

//     return `${((sameAnswerCount / allAnswerCount) * 100).toFixed(2)}%`;
//   };

//   const getAnswerDisplay = (
//     answers: ResultAnswer[],
//     answer: string,
//     count: number,
//   ) =>
//     `${answer || "[ brak odpowiedzi ]"} (${count}) - ${getAnswerPercentage(answer, answers)}`;

//   return (
//     <div>
//       {props.answers.map(({ answer, count }, index) => (
//         <div key={index}>{getAnswerDisplay(props.answers, answer, count)}</div>
//       ))}
//     </div>
//   );
// };

// export default AnswersDisplayedPercentage;
import { ResultAnswer } from "@/types/result";

type Props = {
  answers: ResultAnswer[];
};

const AnswersDisplayedPercentage = ({ answers }: Props) => {
  const total = answers.reduce((sum, a) => sum + a.count, 0);

  const getPercentage = (count: number) => {
    if (total === 0) return 0;
    return (count / total) * 100;
  };

  return (
    <div className="space-y-4">
      {answers.map(({ answer, count }, index) => {
        const percentage = getPercentage(count);
        const formatted = percentage.toFixed(2);

        return (
          <div key={index} className="space-y-1">
            {/* 🔹 Górna linia: tekst + liczby */}
            <div className="flex justify-between text-sm">
              <div className="max-w-[70%] truncate">
                {answer || "[ brak odpowiedzi ]"}
              </div>

              <div className="whitespace-nowrap text-gray-500">
                {count} • {formatted}%
              </div>
            </div>

            {/* 🔹 Pasek */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswersDisplayedPercentage;
