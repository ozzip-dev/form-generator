import { InputType } from "@/enums";
import { isInputTypeCheckbox } from "@/helpers/inputHelpers";
import { FormInput, Input } from "@/types/input";
import { Answers, GroupedAnswer, Submission } from "@/types/result";

export function getAnonymousAnswers(
  submissions: Submission[],
  includeFieldIds: string[] = []
): Answers[] {
  const formAnswers: Answers[] = submissions.map(({ answers }) => answers);

  for (const answer of formAnswers) {
    for (const id of Object.keys(answer)) {
      if (!includeFieldIds.includes(id)) delete answer[id];
    }
  }

  return formAnswers;
}

export function groupAnonymousAnswersByInput(
  inputs: FormInput[],
  answers: Answers[]
): {
  id: string;
  type: InputType;
  header: string;
  answers: (string | Record<string, string>)[];
}[] {
  const inputIds: { id: string; type: InputType; header: string }[] =
    inputs.map(
      ({ id, type, header }) =>
        ({ id, type, header } as {
          id: string;
          type: InputType;
          header: string;
        })
    );
  const inputAnswers: {
    id: string;
    type: InputType;
    header: string;
    answers: (string | Record<string, string>)[];
  }[] = inputIds.map(({ id, type, header }) => ({
    id,
    type,
    header,
    answers: answers.map((answer) => answer[id]),
  }));
  const inputsAnswersUnique = inputAnswers.map((item) => ({
    ...item,
    answers: isInputTypeCheckbox(inputs.find(({ id }) => id == item.id)!)
      ? item.answers
      : [...new Set(item.answers)],
  }));

  return inputsAnswersUnique;
}

// TODO Pawel: przepisz to czytelniej
export function getGroupedAnswersResults(
  inputs: FormInput[],
  answers: Answers[]
): GroupedAnswer[] {
  const inputsAnswersUnique = groupAnonymousAnswersByInput(inputs, answers);
  const mappedCountResults = inputsAnswersUnique.map((item) => {
    const isAnwerStringValue = !isInputTypeCheckbox(item as unknown as Input);
    if (isAnwerStringValue) {
      return {
        ...item,
        answers: item.answers.map((answer) => {
          const count = answers.filter((el) => el[item.id] == answer).length;
          return { answer, count };
        }),
      };
    } else {
      const selectedAnswers: string[] = [];
      for (const anwerSet of item.answers) {
        const matchingAnswers = Object.values(anwerSet).filter((val) => val);
        selectedAnswers.push(...matchingAnswers);
      }
      const answers = selectedAnswers.map((answer) => ({
        answer,
        count: selectedAnswers.filter(
          (selectedAnswer) => selectedAnswer == answer
        ).length,
      }));
      return { ...item, answers };
    }
  });

  return mappedCountResults as GroupedAnswer[];
}
