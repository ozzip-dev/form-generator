import { db, findOne, insert, update } from "@/lib/mongo";
import { Answers, Result, Submission } from "@/types/result";
import { ObjectId } from "mongodb";

async function formResultExists(formId: string): Promise<boolean> {
  return !!(await findOne<Result>(db, 'result', { formId }))
}

async function addSubmission(
  formId: string,
  answers: Answers
): Promise<Result | null> {
  const submission = await update<Result>(
    db,
    'result',
    {
      formId
    },
    {
      $push: {
        submissions: {
          submittedAt: new Date(),
          answers
        }
      }
    }
  )

  return submission as Result | null
}

async function createResult(
  formId: string,
  answers: Answers
): Promise<ObjectId> {
  const result = await insert<Result>(
    db,
    'result',
    {
      formId,
      submissions: [
        {
          submittedAt: new Date(),
          answers
        }
      ]
    }
  )

  return result.insertedId as ObjectId
}

export async function addFormSubmission(
  formId: string,
  answers: Answers
): Promise<void> {
  const resultExists = await formResultExists(formId)
  resultExists
    ? await addSubmission(formId, answers)
    : await createResult(formId, answers)
}

export async function getAllSubmissions(
  formId: string
): Promise<Submission[]> {
  const result: Result | null = await findOne<Result>(db, 'result', { formId })
  if (!result)
    throw new Error('No submissions')
  return result.submissions
}