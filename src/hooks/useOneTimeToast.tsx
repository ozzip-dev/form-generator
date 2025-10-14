// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useToast } from "@/hooks/useToast";

// export type ModelToast = {
//   param: string | null;
//   expectedValue?: string;
//   title: string;
//   description?: string;
//   variant?: "success" | "error" | "info";
// };

// export function useOneTimeToast(configs: ModelToast[]) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { toast } = useToast();

//   useEffect(() => {
//     let triggered = false;

//     configs.forEach(({ param, expectedValue, title, description, variant }) => {
//       const paramValue = searchParams.get(param);

//       if (paramValue && (!expectedValue || paramValue === expectedValue)) {
//         toast({ title, description, variant });
//         triggered = true;
//       }
//     });

//     if (triggered) {
//       router.replace(window.location.pathname);
//     }
//   }, [searchParams, router, toast, configs]);
// }

"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";

export type ModelToast = {
  param?: string | null;
  expectedValue?: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
};

export function useOneTimeToast(configs: ModelToast[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let triggered = false;

    configs.forEach(({ param, expectedValue, title, description, variant }) => {
      if (!param) {
        toast({ title, description, variant });
        triggered = true;
        return;
      }

      const paramValue = searchParams.get(param);

      if (paramValue && (!expectedValue || paramValue === expectedValue)) {
        toast({ title, description, variant });
        triggered = true;
      }
    });

    if (triggered) {
      router.replace(window.location.pathname);
    }
  }, [searchParams, router, toast, configs]);
}
