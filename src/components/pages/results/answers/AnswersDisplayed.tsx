import { ResultAnswer } from "@/types/result";
import RenderAnswers from "./RenderAnswers";
import { usePreparedAnswers } from "./usePrepareAnswers";

type Props = {
  answers: ResultAnswer[];
  isCheckbox: boolean;
};

const AnswersDisplayed = (props: Props) => {
  const answers = usePreparedAnswers(props.answers, props.isCheckbox);

  return <RenderAnswers answers={answers} />;
};

export default AnswersDisplayed;
