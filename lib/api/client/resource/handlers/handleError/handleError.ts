import axios from "axios";
import { GENERIC_ERROR_MESSAGE } from "../errorMessage";

/**
 * handle error thrown by axios
 * @param error error thrown by axios
 */
export const handleError = (error: any): never => {
  console.error(error);
  if (axios.isAxiosError(error)) {
    const errorMessage = error?.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw new Error(GENERIC_ERROR_MESSAGE);
};
