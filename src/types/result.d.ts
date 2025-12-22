export type Answers = Record<string, string | Record<string, string>>;

export type Submission = {
  id: ObjectId;
  submittedAt: Date;
  answers: Answers;
};

export type SubmissionSerialized = {
  id: string;
  submittedAt: string;
  answers: Answers;
};

export interface Result extends Document {
  formId: string;
  submissions: Submission[];
}

export interface ResultSerialized extends Document {
  formId: string;
  submissions: SubmissionSerialized[];
}

export interface ResultAnswer {
  answer: string;
  count: number;
}

export interface GroupedAnswer {
  answers: ResultAnswer[];
  id: string;
  header: string;
}

export type DiagramType = {
  value: string;
  label: string;
  selected: boolean;
};
