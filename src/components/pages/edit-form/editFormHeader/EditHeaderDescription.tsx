"use client";

import { use, useState, useTransition } from "react";
import { useFormData } from "@/context/FormDataContextProvider";
import { editFormHeaderAction } from "@/actions/edit-form/editFormHeaderAction";
import { Button, IconTrash } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import TextEditor from "../textEditor/TextEditor";
import TextEditorPrinter from "../textEditor/TextEditorPrinter";
import RemoveTextEditorBtn from "../textEditor/RemoveTextEditorBtn";

type Props = {
    onClose: () => void;
};

const EditHeaderDescription = ({ onClose }: Props) => {
    const { formDataPromise } = useFormData();
    const form = use(formDataPromise);
    const formId = form?._id;

    const [isEditorOpen, setEditorOpen] = useState(!form?.description);
    const [isPending, startTransition] = useTransition();

    useAutoLoader(isPending);

    const handleRemove = () => {
        if (!form?.description) {
            onClose();
            return;
        }

        startTransition(async () => {
            if (formId) {
                await editFormHeaderAction(formId, { description: "" });
            }
            onClose();
        });
    };

    return (
        <div className="flex gap-2 mt-4">
            <div className="flex-1">
                {isEditorOpen ? (
                    <TextEditor
                        formId={formId!}
                        description={form?.description ?? ""}
                        editAction={editFormHeaderAction}
                        printDescriptionInput={() => setEditorOpen(false)}
                    />
                ) : (
                    <TextEditorPrinter
                        description={form?.description ?? ""}
                        printDescriptionInput={() => setEditorOpen(true)}
                    />
                )}
            </div>
            <RemoveTextEditorBtn handleRemoveDescription={handleRemove} />
        </div>
    );
};

export default EditHeaderDescription;




