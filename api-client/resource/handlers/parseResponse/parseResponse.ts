import { AxiosResponse } from "axios";
import * as ERR_MSG from "../ErrorMessage";

/**
 * Validates the Axios response object and returns its data payload
 *
 * @param {AxiosResponse<T>} response
 *   The Axios response object that contains a data payload that's
 *   defined by the generic type passed to this method
 * @param {string} URL
 *   URL of the API endpoint we are querying against
 *   Used for more informational error messages if they occur
 *
 * @returns {T}
 *   The Axios response object's "data" field that contains the data object
 *   that's returned from the external API endpoint. This data object is of
 *   the schema of the generic type passed to this method
 */
const parseResponse = <T>(response: AxiosResponse<T>, URL: string): T => {
  if (response.data === undefined) {
    const msg = ERR_MSG.formatPayloadUndefinedErrorMessage(URL);
    console.error(msg);
    throw new Error(msg);
  } else if (response.data === null) {
    const msg = ERR_MSG.formatPayloadNullErrorMessage(URL);
    console.error(msg);
    throw new Error(msg);
  } else {
    return response.data;
  }
};

export { parseResponse };
