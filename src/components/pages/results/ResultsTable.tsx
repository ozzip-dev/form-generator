type Props = {
  inputHeaders: string[];
  submissionValues: string[][];
};

const ResultsTable = async (props: Props) => {
  return (
    <table className="w-full min-w-max border-collapse text-sm">
      <thead className="sticky top-0 z-10 bg-white">
        <tr className="*:p-sm">
          {props.inputHeaders?.map((header, idx) => (
            <th key={idx} className="text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-highlighted mt-4 overflow-x-auto overflow-y-auto">
        {props.submissionValues.map((submission, idx) => (
          <tr key={idx} className="*:max-w-[150px] *:p-sm">
            {submission.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
