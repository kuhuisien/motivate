import axios from "axios";
import { GeneralResponse } from "lib/types/data.types";
import { SIGN_UP_URL } from "api-client/resource/configs/URL";
import { getRequestOptions } from "api-client/resource/configs/requests";
import { parseResponse } from "api-client/resource/handlers/parseResponse/parseResponse";

const signup = async (
  email: string | null,
  password: string | null
): Promise<GeneralResponse> => {
  try {
    const response = await axios.post<GeneralResponse>(
      SIGN_UP_URL,
      createRequestPayload(email, password),
      getRequestOptions()
    );
    return parseResponse(response, SIGN_UP_URL);
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const createRequestPayload = (
  email: string | null,
  password: string | null
) => {
  return {
    email,
    password,
  };
};

export { signup };
