import { FormInput } from "@/types/input"
import { Answers, GroupedAnswer, Submission } from "@/types/result"

export function getAnonymousAnswers(
  submissions: Submission[],
  includeFieldIds: string[] = []
): Answers[] {
  const formAnswers: Answers[] = submissions.map(({ answers }) => answers)

  for (const answer of formAnswers) {
    for (const id of Object.keys(answer)) {
      if (!includeFieldIds.includes(id)) delete answer[id]
    }
  }

  return formAnswers
}

export function groupAnonymousAnswersByInput(
  inputs: FormInput[],
  answers: Answers[]
): { id: string, header: string, answers: string[] }[] {
  const inputIds: { id: string, header: string }[] = inputs
    .map(({ id, header }) => ({ id, header } as { id: string, header: string }))
  const inputAnswers: { id: string, header: string, answers: string[] }[] = inputIds
    .map(({ id, header }) => ({
      id,
      header,
      answers: answers.map((answer) => answer[id])
    }))
  const inputsAnswersUnique = inputAnswers.map((item) => ({
    ...item,
    answers: [...new Set(item.answers)]
  }))

  return inputsAnswersUnique
}

export function getGroupedAnswersResults(
  inputs: FormInput[],
  answers: Answers[]
): GroupedAnswer[] {
  const inputsAnswersUnique = groupAnonymousAnswersByInput(inputs, answers)
  const mappedCountResults = inputsAnswersUnique
    .map((item) => ({
      ...item,
      answers: item.answers.map((answer) => {
        const count = answers
          .filter((el) => el[item.id] == answer).length
        return { answer, count }
      })
    }))

  return mappedCountResults
}