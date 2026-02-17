import { useMemo } from "react";
import { ResultAnswer } from "@/types/result";

export const usePreparedAnswers = (
  answers: ResultAnswer[],
  isCheckbox: boolean,
) => {
  return useMemo(() => {
    if (!isCheckbox) return answers;

    const unique = [
      ...new Set(answers.map(({ answer, count }) => `${answer};${count}`)),
    ];

    return unique.map((item) => {
      const [answer, count] = item.split(";");
      return { answer, count: Number(count) };
    });
  }, [answers, isCheckbox]);
};
