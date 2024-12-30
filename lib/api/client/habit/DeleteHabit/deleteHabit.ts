import axios from "axios";
import { DELETE_HABIT_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { GeneralResponse, ApiQuery } from "lib/types/common/data.types";

const deleteHabit = async (
  _dummyRequestBody: undefined,
  query: ApiQuery
): Promise<GeneralResponse> => {
  try {
    const response = await axios.delete<GeneralResponse>(
      constructUrl(query),
      getRequestOptions()
    );
    return parseResponse(response, DELETE_HABIT_URL);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
    throw new Error("An error occured");
  }
};

const constructUrl = (query: ApiQuery) => {
  // get first parameter
  const id = query[Object.keys(query)[0]];

  // encode query parameter value
  const encodedQueryValue = encodeURIComponent(id);

  // construct URL
  var url = `${DELETE_HABIT_URL}/${encodedQueryValue}`;
  return url;
};

export { deleteHabit };
