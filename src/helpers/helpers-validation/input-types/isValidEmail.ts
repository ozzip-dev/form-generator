export function isValidEmail(value: string): boolean {
  const email: string = value.toString().trim();
  const pattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email);
}
