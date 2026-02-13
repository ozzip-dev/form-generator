import NoResultsInfo from "@/components/pages/results/NoResultsInfo";
import { ResultsPdfTable } from "@/components/pages/results/ResultsPdfTable";
import ResultsTable from "@/components/pages/results/ResultsTable";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { getSortedInputs, isFormSecret } from "@/helpers/formHelpers";
import { isInputSubmittable } from "@/helpers/inputHelpers";
import { getFormById } from "@/services/form-service";
import { formHasResults, getAllSubmissions } from "@/services/result-service";
import { Answers, Submission } from "@/types/result";

type Props = { params: Promise<{ formId: string }> };

const FormResultsTablePage = async (props: Props) => {
  const { formId } = await props.params;

  const hasResults = await formHasResults(formId);
  if (!hasResults) return <NoResultsInfo />;

  const form = await getFormById(formId);
  const submissions: Submission[] = await getAllSubmissions(formId);
  const submittableInputs = getSortedInputs(form).filter(isInputSubmittable);

  const getAnswerDisplay = (value: string | Record<string, string>): string => {
    if (typeof value == "string") return value;
    try {
      return Object.values(value)
        .filter((val) => val)
        .join(", ");
    } catch (_) {
      return "[ nieprawidłowe dane ]";
    }
  };

  const headerValues: string[] = submittableInputs.map(({ header }) => header);
  const inputHeaders: string[] = isFormSecret(form)
    ? headerValues
    : ["Wysłany", ...headerValues];

  const getAnswerValues = (answers: Answers): string[] =>
    Object.entries(answers).map(([_, value]) => getAnswerDisplay(value));
  const submissionValues: string[][] = submissions.map(
    ({ answers, submittedAt }) =>
      isFormSecret(form)
        ? getAnswerValues(answers)
        : [
            formatDateAndTime(submittedAt!.toISOString()),
            ...getAnswerValues(answers),
          ],
  );
  const { title = "", createdAt } = form;

  return (
    <div className="container flex h-full flex-col">
      <SectionHeader
        className="shring-0 my-6 ml-8"
        message={
          <div>
            <div className="sm:flex">
              <div className="mr-2 font-normal text-font_light">
                Tytuł formularza:{" "}
              </div>
              <div>{title} </div>
            </div>{" "}
            <div className="text-center text-2xs text-font_light sm:text-left">
              <span className="mr-1"> Opublikowany:</span>
              {formatDateAndTime(createdAt.toString())}
            </div>
          </div>
        }
      />
      <div className="flex-1">
        <ResultsTable {...{ inputHeaders, submissionValues }} />
      </div>
      <div className="shring-0">
        <ResultsPdfTable
          {...{
            inputHeaders,
            submissionValues,
            title: form.title || "formularz",
          }}
        />
      </div>
    </div>
  );
};

export default FormResultsTablePage;
