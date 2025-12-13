export const formatDateAndTime = (date?: string): string => {
  if (!date) return "Brak daty";
  return new Date(date).toLocaleString("pl-PL", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
