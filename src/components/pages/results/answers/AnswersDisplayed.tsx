import { ResultAnswer } from "@/types/result";
import AnswersDisplayedSum from "./AnswersDisplayedSum";
import AnswersDisplayedPercentage from "./AnswersDisplayedPercentage";

type Props = {
  answers: ResultAnswer[];
  isCheckbox: boolean;
};

const AnswersDisplayed = (props: Props) => {
  return (
    <>
      {props.isCheckbox ? (
        <AnswersDisplayedSum answers={props.answers} />
      ) : (
        <AnswersDisplayedPercentage answers={props.answers} />
      )}
    </>
  );
};

export default AnswersDisplayed;
