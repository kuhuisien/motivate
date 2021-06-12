import { hash, compare } from "bcryptjs";

/*
A salt is added to the hashing process to force their uniqueness, 
increase their complexity without increasing user requirements, 
and to mitigate password attacks like hash tables
*/
const SALT_LENGTH = 12;

/**
 * hash the text with salt
 * @param text text to be hashed
 */
export async function hashText(text: string) {
  const hashedText = await hash(text, SALT_LENGTH);
  return hashedText;
}

/**
 * compares the given data against the given hash.
 * @param text orginal string value
 * @param hashedText hashed string value
 */
export async function verifyHash(text: string, hashedText: string) {
  const isValid = await compare(text, hashedText);
  return isValid;
}
