"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { UseFormTrigger } from "react-hook-form";
import { useErrorBoundary } from "react-error-boundary";

type EditAction = (formId: string, ...args: any[]) => Promise<any>;

type UseEditOptions = {
  formId?: string;
  inputId?: string;
  trigger?: UseFormTrigger<any>;
  action: EditAction;
  mode?: "form" | "input";
};

export function useEditFormDraftXX({
  formId,
  inputId,
  trigger,
  action,
  mode = "form",
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
        console.log("");
        if (trigger) {
          const isValid = await trigger(name);
          if (!isValid) {
            debounceMap.current.delete(key);
            return;
          }
        }

        try {
          setLoading((prev) => ({ ...prev, [name]: true }));

          if (mode === "input") {
            const bodyKeyName = name.split(".").pop();
            await action(formId, inputId!, {
              [bodyKeyName as string]: value.trim(),
            });
          } else {
            await action(formId, { [name]: value.trim() });
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
