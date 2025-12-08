// "use client";

// import { ChangeEvent, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useToast } from "@/hooks/useToast";
// import InputError from "@/components/shared/inputs/InputError";
// import {
//   uploadProtocolSchema,
//   UploadProtocolSchema,
// } from "@/lib/zodSchema/uploadProtocolSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/shared";
// import { uploadFileAction } from "@/actions/protocol/uploadFileAction";

// const AddProtocolForm = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();
//   const {
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//   } = useForm<UploadProtocolSchema>({
//     resolver: zodResolver(uploadProtocolSchema),
//     mode: "onChange",
//   });

//   /* Need to overwrite the useForm reset fn, didn't work fine for the file type input */
//   const reset = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const uploadFile = async ({ file }: UploadProtocolSchema) => {
//     if (!file) return;

//     await uploadFileAction(file);

//     toast({
//       title: "Sukces",
//       description: "Protokół dodany",
//       variant: "success",
//     });

//     reset();
//   };

//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("file", file, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(uploadFile)}
//       className="flex items-center mt-8"
//     >
//       <label htmlFor="file">
//         <div className="text-lg font-black">Dodaj nowy protokół</div>
//         <input type="file" ref={fileInputRef} onChange={onChange} />
//       </label>
//       <div>
//         <Button message="Wgraj protokół" isLoading={isSubmitting} />
//       </div>

//       <InputError errorMsg={errors?.file?.message as string} />
//     </form>
//   );
// };

// export default AddProtocolForm;

"use client";

import { DataLoader } from "@/components/shared";
import { useState } from "react";
import DocumentDrop from "./DocumentDrop";
import ProtocolForm from "./ProtocolForm";
import ModalWrapper from "@/components/shared/ModalWrapper";
import DeleteDocumentConformation from "../protocolsList/DeleteDocumentConformation";
import { az } from "zod/v4/locales";

// branza
// data rozpoczecia sporu
// powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
// nazwa związku
// nazwa zakładu
// rządania wszynające spór zbiorowy - ladowanie plikow
// rokowania - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności, inne
// mediacje - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności, inne
// porozumienie kończące spór
// inne - ladowanie likow

const AddProtocolForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handlePrintModal = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-sm flex items-center justify-center">
          <DataLoader />
        </div>
      )}
      {isDeleteModalOpen && (
        <ModalWrapper isOpen={isDeleteModalOpen} onClose={handlePrintModal}>
          <DeleteDocumentConformation setModalOpen={setDeleteModalOpen} />
        </ModalWrapper>
      )}

      <ProtocolForm />
      <div className="w-4/5 m-auto flex flex-col gap-5">
        <div className="text-2xl">Załącz dokumenty</div>
        <DocumentDrop
          label="Żądania wstrzynające spór"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <div className="text-2xl">Rokowania</div>
        <DocumentDrop
          label="Protokoły ze spotakń"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Główny protokul rozbierzności"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Rokowania inne"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <div className="text-2xl">Mediacje</div>
        <DocumentDrop
          label="Protokoły ze spotakń"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Główny protokul rozbierzności"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Mediacje inne"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Porozumienie kończące spór"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        <DocumentDrop
          label="Spór inne"
          setGlobalPending={setIsPending}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      </div>
    </>
  );
};

export default AddProtocolForm;
