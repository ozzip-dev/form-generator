type Answer = Record<string, unknown /* string? */>

export type Submission = {
  submittedAt: Date;
  answers: Answer[];
}

export type SubmissionSerialized = {
  submittedAt: string;
  answers: Answer[];
}

export interface Result extends Document {
  formId: string;
  submissions: Submission[];
}

export interface ResultSerialized extends Document {
  formId: string;
  submissions: SubmissionSerialized[];
}