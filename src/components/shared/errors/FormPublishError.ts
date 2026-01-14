export class FormPublishError extends Error {
  constructor(fields: string) {
    super(`Uzupełnij brakujące dane formularza: ${fields}`);
    this.name = "PublishError";
  }
}
