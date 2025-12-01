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
  mode: "formHeader" | "inputLabel" | "inputOption";
  setError?: UseFormSetError<any>;
};

export function useEditForm({
  formId,
  inputId,
  trigger,
  action,
  mode,
  setError,
}: UseEditOptions) {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setLoading] = useState<Record<string, boolean>>({});
  const debounceMap = useRef(new Map<string, NodeJS.Timeout>());

  const modeHandlers = {
    formHeader: (name: string, value: string) => [{ [name]: value }],
    inputLabel: (name: string, value: string) => [inputId!, { [name]: value }],
    inputOption: (name: string, value: string) => [inputId!, value, name],
  } as const;

  const handleEdit = useCallback(
    (name: string, value: string) => {
      if (!formId) return;

      const key = `${formId}-${name}`;
      clearTimeout(debounceMap.current.get(key)!);

      const timeout = setTimeout(async () => {
        console.log("www", name);
        if (trigger && !(await trigger(name))) {
          debounceMap.current.delete(key);
          return;
        }

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));

          const args = modeHandlers[mode](name, value);

          const resp = await action(formId, ...args);

          if (resp?.error && setError) {
            console.log("resp?.error", resp?.error);
            handleClientErrors<AddFormFieldSchema>(resp.error, setError);
            return;
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
    [formId, inputId, trigger, action, mode, setError, showBoundary]
  );

  useEffect(() => {
    return () => {
      debounceMap.current.forEach(clearTimeout);
      debounceMap.current.clear();
    };
  }, []);

  return { handleEdit, isLoading };
}
