const requredCommitteeKeys = [
  "committeeEmail",
  "committeeName",
  "committeePhone",
  "committeeUnion",
];

export function hasCompleteCommitteeData(user: any): boolean {
  return requredCommitteeKeys.every((key) => {
    const value = user[key];
    return (
      value !== undefined &&
      value !== null &&
      typeof value === "string" &&
      value.trim().length > 0
    );
  });
}
