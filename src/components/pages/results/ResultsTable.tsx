type Props = {
  inputHeaders: string[];
  submissionValues: string[][];
};

const ResultsTable = async (props: Props) => {
  return (
    <div className="max-h-[calc(100vh-280px)] overflow-y-auto overflow-x-auto">
      <table className="min-w-max w-full text-sm border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="*:p-2">
            {props.inputHeaders.map((header, idx) => (
              <th key={idx} className="text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.submissionValues.map((submission, idx) => (
            <tr key={idx} className="*:p-2">
              {submission.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
