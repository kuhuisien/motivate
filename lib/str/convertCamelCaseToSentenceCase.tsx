export const camelToSentenceCase = (str: string) =>
  str?.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
