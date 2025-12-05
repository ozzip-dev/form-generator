"use client"

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/shared";
import { DiagramType, GroupedAnswer } from "@/types/result";
import AnswerResults from "./AnswerResults";
import { FormInput, FormInputSelectable } from "@/types/input";
import ResultFieldSelect from "./ResultFieldSelect";
import ResultDiagramSelect from "./ResultDiagramSelect";

type Props = {
  inputs: FormInput[]
  displayResults: (selectedInputIds: string[]) => Promise<GroupedAnswer[]>
  formData: { title: string, description: string }
}

export const diagramTypes: DiagramType[] = [
  {
    value: 'pieChart',
    label: 'Diagram kołowy',
    selected: true
  },
  {
    value: 'barChart',
    label: 'Diagram słupkowy',
    selected: true
  },
]

const Results = (props: Props) => {
  const [results, setResults] = useState<GroupedAnswer[]>([])
  const [diagrams, setDiagrams] = useState<DiagramType[]>(diagramTypes)
  const [inputs, setInputs] = useState<FormInputSelectable[]>(
    props.inputs.map((el) => ({...el, selected: true}))
  )

  const { title, description } = props.formData

  const onDisplayAnswers = async () => {
    const inputIds = inputs
      .filter(({ selected }) => selected)
      .map(({ id }) => id!)
    const groupedResults = await props.displayResults(inputIds)
    setResults(groupedResults)
  }

  const exportPdf = () => {
     html2canvas(document.querySelector("#results")!).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'PNG', 0, 0, width, 0, 'SLOW');
        pdf.save("download.pdf"); 
    });
  }

  return (
    <div className="p-8">
      <div className=" w-fit p-4 border">
        <ResultFieldSelect
          {...{inputs, setInputs}}
        />

        <Button
          onClickAction={onDisplayAnswers}
          message="Pokaz wyniki"
          className="!w-auto my-4"
        />
      </div>

      <div className="w-fit mt-4 p-4 border">
        <ResultDiagramSelect
          {...{diagrams, setDiagrams}}
        />

        <Button
          onClickAction={exportPdf}
          message="Pobierz"
          className="!w-auto my-4"
          disabled={!results.length}
        />
      </div>
      
      <div id="results" className="w-fit">
        {!!results.length && <div><div className="text-3xl">{title}</div>
        <div className="text-2xl mb-4">{description}</div></div>}
        {results.map((result, i) => (
          <AnswerResults
            {...{result, diagrams}}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
