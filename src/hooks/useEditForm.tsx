"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { UseFormTrigger, UseFormSetError } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { AddFormFieldSchema } from "@/lib/zodSchema/editFormSchemas/addFormFieldSchema";

type UseEditOptions = {
  formId?: string;
  inputId?: string;
  inputIdx?: number;
  trigger: UseFormTrigger<any>;
  action: (formId: string, ...args: any[]) => Promise<any>;
  mode:
    | "formHeader"
    | "inputLabel"
    | "inputType"
    | "inputReqired"
    | "inputUnique"
    | "inputOption";
  setError?: UseFormSetError<any>;
};

export function useEditForm({
  formId,
  inputId,
  inputIdx,
  trigger,
  action,
  mode,
  setError,
}: UseEditOptions) {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setLoading] = useState<Record<string, boolean>>({});
  const debounceMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const handleEdit = useCallback(
    (name: string, value: string) => {
      if (!formId) return;
      const key = `${formId}-${name}`;

      if (debounceMap.current.has(key)) {
        clearTimeout(debounceMap.current.get(key)!);
      }

      const timeout = setTimeout(async () => {
        if (trigger) {
          const isValid = await trigger(name);
          if (!isValid) {
            debounceMap.current.delete(key);
            return;
          }
        }

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));

          switch (mode) {
            case "formHeader": {
              const resp = await action(formId, { [name]: value.trim() });
              if (resp?.error && setError) {
                handleClientErrors<AddFormFieldSchema>(resp.error, setError);
                return;
              }
              break;
            }
            case "inputLabel": {
              const bodyKeyName = name.split(".").pop();
              const resp = await action(formId, inputId!, {
                [bodyKeyName as string]: value.trim(),
              });

              if (resp?.error && setError) {
                const fieldErrors = Object.entries(resp.error).reduce(
                  (acc, [key, val]) => {
                    acc[`inputs.${inputIdx}.${key}`] = val;
                    return acc;
                  },
                  {} as Record<string, any>
                );

                console.log("", fieldErrors);

                handleClientErrors<AddFormFieldSchema>(
                  { error: fieldErrors },
                  setError
                );
                return;
              }

              break;
            }
            case "inputType": {
              await action(formId, inputId!, value.trim());
              break;
            }

            case "inputOption": {
              const resp = await action(formId, inputId!, value.trim(), name);

              if (resp?.error && setError) {
                handleClientErrors<AddFormFieldSchema>(resp.error, setError);
                return;
              }
              break;
            }
          }
        } catch (err) {
          showBoundary(err);
        } finally {
          setLoading((prev) => ({ ...prev, [name]: false }));
          debounceMap.current.delete(key);
        }
      }, 800);

      debounceMap.current.set(key, timeout);
    },
    [formId, inputId, inputIdx, trigger, action, mode, setError, showBoundary]
  );

  useEffect(() => {
    return () => {
      debounceMap.current.forEach((timeout) => clearTimeout(timeout));
      debounceMap.current.clear();
    };
  }, []);

  return { handleEdit, isLoading };
}
