import { ResultAnswer } from "@/types/result";
type Props = {
  answers: ResultAnswer[];
};

export const RenderAnswers = ({ answers }: Props) => {
  const total = answers.reduce((sum, a) => sum + a.count, 0);

  const getPercentage = (count: number) => {
    if (total === 0) return 0;
    return (count / total) * 100;
  };

  return (
    <div className="space-y-4">
      {answers.map(({ answer, count }, index) => {
        const percentage = getPercentage(count);
        const formatted = percentage.toFixed(0);

        return (
          <div key={index} className="space-y-1 lg:flex lg:items-center">
            <div className="flex flex-1 justify-between text-sm">
              <div className="result-answer mr-3 flex-1 truncate lg:w-[60rem] lg:text-right">
                {answer || "[ brak odpowiedzi ]"}
              </div>

              <div className="ml-3 whitespace-nowrap lg:hidden">
                <span className="font-semibold">{count}</span>
                <span> • {formatted}%</span>
              </div>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-bg_dark">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="ml-3 hidden w-24 whitespace-nowrap lg:block">
              <span className="font-semibold">{count}</span>
              <span> • {formatted}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderAnswers;
