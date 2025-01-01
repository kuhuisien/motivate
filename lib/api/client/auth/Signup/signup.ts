import axios from "axios";
import { SIGN_UP_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { GeneralResponse } from "lib/types/common/data.types";
import { handleError } from "../../resource/handlers/handleError/handleError";

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
    return handleError(error);
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
