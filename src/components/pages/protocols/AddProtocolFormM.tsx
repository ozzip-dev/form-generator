
"use client";

import { useActionState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/shared";
import { ProtocolDisputeReason, ProtocolInsertData } from "@/types/protocol";
import { createProtocol } from "@/actions/protocol/createProtocol";
import { mapDisputeReason } from "./utils";

type State = {
  errors: Record<string, string[]>;
  inputs: Record<string, string> | null;
};

const initialState: State = { errors: {}, inputs: null };

const textInputs: { id: string; label: string }[] = [
  {
    id: 'branch',
    label: 'Branza'
  },
  {
    id: 'tradeUnionName',
    label: 'Nazwa związku'
  },
  {
    id: 'workplaceName',
    label: 'Nazwa zakładu'
  },
]

// TODO: ladniej
const disputeReasonOptions: { id: ProtocolDisputeReason, label: string }[] = [
  {
    id: 'workTime',
    label: mapDisputeReason['workTime']
  },
  {
    id: 'safety',
    label: mapDisputeReason['safety']
  },
  {
    id: 'wages',
    label: mapDisputeReason['wages']
  },
  {
    id: 'standards',
    label: mapDisputeReason['standards']
  },
  {
    id: 'other',
    label: mapDisputeReason['other']
  },
]

const AddProtocolForm = () => {
  // const { toast } = useToast();
  
  const uploadFile = async (
    _: State,
    formData: FormData
  ): Promise<any> => {
    const {
      branch,
      disputeStartDate,
      tradeUnionName,
      workplaceName,
    } = Object.fromEntries(formData.entries()) as unknown as ProtocolInsertData

    await createProtocol({
      branch,
      disputeReason: formData.getAll('disputeReason') as ProtocolDisputeReason[],
      tradeUnionName,
      workplaceName,
      disputeStartDate,
    })

    // toast({
    //   title: "Sukces",
    //   description: "Protokół dodany",
    //   variant: "success",
    // });
  };

  const [_, formAction, isPending] = useActionState(
    uploadFile,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 justify-start p-8 bg-slate-200"
    >
      {textInputs.map(({ id, label }, i) => (
        <label key={i} htmlFor={id}>
          <div className="text-lg font-black">{label}</div>
          <input type="text" name={id} />
        </label>
      ))}

        <div>
          <div className="text-lg font-black">Powod sporu</div>
          <div className="flex gap-4">
            {disputeReasonOptions.map(({ id, label }, i) => (
              <label key={i} htmlFor={id}>
                <input
                  type="checkbox"
                  name="disputeReason"
                  value={id}
                  id={id}
                  className="mr-2"  
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>


        <label htmlFor="disputeStartDate">
          <div className="text-lg font-black">Data rozpoczecia sporu</div>
          <input type="date" name='disputeStartDate' />
        </label>

      <Button
        isLoading={isPending}
        message="Utwórz protokół"
        className="!w-64"
      />
    </form>
  );
};

export default AddProtocolForm;

