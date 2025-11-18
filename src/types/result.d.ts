export type Answers = Record<string, unknown /* string? */>

export type Submission = {
  submittedAt: Date;
  answers: Answers;
}

export type SubmissionSerialized = {
  submittedAt: string;
  answers: Answers;
}

export interface Result extends Document {
  formId: string;
  submissions: Submission[];
}

export interface ResultSerialized extends Document {
  formId: string;
  submissions: SubmissionSerialized[];
}