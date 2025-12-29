type Props = {
  inputHeaders: string[];
  submissionValues: string[][];
};

const ResultsTable = async (props: Props) => {
  return (
    <table>
      <thead>
        <tr className="*:p-2">
          {props.inputHeaders.map((header, idx) => (
            <th key={idx}>{header}</th>
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
  );
};

export default ResultsTable;
