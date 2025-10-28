"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { UseFormTrigger } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";

type UseEditOptions = {
  formId?: string;
  inputId?: string;
  trigger?: UseFormTrigger<any>;
  action: (formId: string, ...args: any[]) => Promise<any>;
  mode: "formHeader" | "inputLabel" | "inputType";
};

export function useEditForm({
  formId,
  inputId,
  trigger,
  action,
  mode,
}: UseEditOptions) {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setLoading] = useState<Record<string, boolean>>({});
  const debounceMap = useRef<Map<string, NodeJS.Timeout>>(new Map());

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
              await action(formId, { [name]: value.trim() });
              break;
            }
            case "inputLabel": {
              const bodyKeyName = name.split(".").pop();
              await action(formId, inputId!, {
                [bodyKeyName as string]: value.trim(),
              });
              break;
            }
            case "inputType": {
              await action(formId, inputId!, value.trim());
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
    [formId, inputId, trigger, action, mode]
  );

  useEffect(() => {
    return () => {
      debounceMap.current.forEach((timeout) => clearTimeout(timeout));
      debounceMap.current.clear();
    };
  }, []);

  return { handleEdit, isLoading };
}
