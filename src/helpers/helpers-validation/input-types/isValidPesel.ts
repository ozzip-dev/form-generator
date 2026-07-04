export function isValidPesel(value: number): boolean {
  const pesel: string = value.toString();
  const controlNumber: number = parseInt(pesel.substring(10, 11));
  const weight: number[] = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum =
    weight.reduce(
      (acc, currentWeight, index) =>
        acc + parseInt(pesel.substring(index, index + 1)) * currentWeight,
      0,
    ) % 10;
  return (10 - sum) % 10 === controlNumber;
}
