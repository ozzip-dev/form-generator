import { useParams } from "next/navigation";

export const useSafeURLParam = (name: string): string | undefined => {
  const params = useParams();
  const value = params[name];
  return Array.isArray(value) ? value[0] : value;
};
