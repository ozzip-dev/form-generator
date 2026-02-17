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
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <div className="flex-1 truncate">
                {answer || "[ brak odpowiedzi ]"}
              </div>

              <div className="ml-3 whitespace-nowrap">
                <span className="font-bold">{count}</span>
                <span> • {formatted}%</span>
              </div>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderAnswers;
