import { InputType } from "@/enums";

export type Answers = Record<string, string | Record<string, string>>;

/* 'id' i 'submittedAt' opcjonalne = nie ma ich w tajnych submissions */
export type Submission = {
  id?: ObjectId;
  submittedAt?: Date;
  answers: Answers;
};

/* 'id' i 'submittedAt' opcjonalne = nie ma ich w tajnych submissions */
export type SubmissionSerialized = {
  id?: string;
  submittedAt?: string;
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
  type: InputType;
  header: string;
}

export type DiagramType = {
  value: string;
  label: string;
  selected: boolean;
};
