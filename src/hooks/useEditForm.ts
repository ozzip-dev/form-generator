"use client";

import { usePublishFormErrorSetters } from "@/context/PublishFormErrorContextProvider";
import { setClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useCallback, useEffect, useRef, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { UseFormSetError, UseFormTrigger } from "react-hook-form";

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
  const { clearHeaderFieldError } = usePublishFormErrorSetters();

  const handleEdit = useCallback(
    (name: string, value: string, isOtherOption?: boolean) => {
      if (!formId) return;

      const modeHandlers = {
        formHeader: (name: string, value: string) => [{ [name]: value }],
        inputLabel: (name: string, value: string) => [
          inputId!,
          { [name]: value },
        ],
        inputOption: (name: string, value: string) => [
          inputId!,
          value,
          name,
          isOtherOption,
        ],
      } as const;

      const key = `${formId}-${name}`;
      clearTimeout(debounceMap.current.get(key)!);

      const timeout = setTimeout(async () => {
        if (trigger && !(await trigger(name))) {
          debounceMap.current.delete(key);
          return;
        }

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));

          const args = modeHandlers[mode](name, value);

          const resp = await action(formId, ...args);

          if (resp?.validationErrors && setError) {
            setClientErrors(resp.validationErrors, setError);
            return;
          }

          const errorName = args[0] && Object.keys(args[0])[0];

          mode === "formHeader" && clearHeaderFieldError(errorName);
        } catch (err) {
          showBoundary(err);
        } finally {
          setLoading((prev) => ({ ...prev, [name]: false }));
          debounceMap.current.delete(key);
        }
      }, 800);

      debounceMap.current.set(key, timeout);
    },
    [
      formId,
      inputId,
      trigger,
      action,
      mode,
      setError,
      showBoundary,
      clearHeaderFieldError,
    ],
  );

  useEffect(() => {
    const map = debounceMap.current;

    return () => {
      map.forEach(clearTimeout);
      map.clear();
    };
  }, []);

  return { handleEdit, isLoading };
}
