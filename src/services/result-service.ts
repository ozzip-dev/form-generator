import { db, findById, findOne, insert, update } from "@/lib/mongo";
import { Form } from "@/types/form";
import { Answers, Result, Submission } from "@/types/result";
import { ObjectId } from "mongodb";
import { getFormById } from "./form-service";
import { isFormSecret } from "@/helpers/formHelpers";

export async function formResultExists(formId: string): Promise<boolean> {
  return !!(await findOne<Result>(db, "result", { formId }));
}

export async function checkUniqueFieldsValid(
  formId: string,
  answers: Answers
): Promise<string[]> /* return value? eg. date? */ {
  const form = await findById<Form>(db, "form", new ObjectId(formId));
  if (!form) throw new Error("Invalid form id");

  const uniqueInputIds: string[] = form.inputs
    .filter(({ unique }) => unique)
    .map(({ id }) => id!);
  const submissions = await getAllSubmissions(formId);

  const uniqueErrorFields: string[] = []

  for (const submission of submissions) {
    const uniqueSubmissionIds = Object.keys(submission.answers).filter((key) =>
      uniqueInputIds.includes(key)
    );

    for (const answerId of uniqueSubmissionIds) {
      if (
        submission.answers[answerId] == answers[answerId]
          && !uniqueErrorFields.some((id) => id == answerId)
      ) {
        uniqueErrorFields.push(answerId)
      }
    }
  }

  return uniqueErrorFields
}

export async function addSubmission(
  formId: string,
  answers: Answers
): Promise<Result | null> {
  const form = await getFormById(formId);
  const isSecret = isFormSecret(form);

  const submissionRecord = isSecret
    ? { answers }
    : {
        id: new ObjectId(),
        submittedAt: new Date(),
        answers,
      };

  const submission = await update<Result>(
    db,
    "result",
    {
      formId,
    },
    {
      $push: {
        submissions: submissionRecord,
      },
    }
  );

  return submission as Result | null;
}

export async function createResult(
  formId: string,
  answers: Answers
): Promise<ObjectId> {
  const result = await insert<Result>(db, "result", {
    formId,
    submissions: [
      {
        id: new ObjectId(),
        submittedAt: new Date(),
        answers,
      },
    ],
  });

  return result.insertedId as ObjectId;
}

export async function formHasResults(formId: string): Promise<boolean> {
  const result: Result | null = await findOne<Result>(db, "result", { formId });
  return !!result?.submissions.length;
}

export async function getAllSubmissions(formId: string): Promise<Submission[]> {
  const result: Result | null = await findOne<Result>(db, "result", { formId });
  if (!result) return [];
  return result.submissions;
}

// export function getAnonymousAnswers(
//   submissions: Submission[],
//   excludeIds: string[] = []
// ): Answers[] {
//   const formAnswers: Answers[] = submissions.map(({ answers }) => answers)

//   for (const answer of formAnswers) {
//     for (const id of excludeIds) delete answer[id]
//   }

//   return formAnswers
// }
