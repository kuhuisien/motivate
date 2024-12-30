import axios from "axios";
import { GET_SYSTEM_SETTINGS_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { SystemSettingListingResponseType } from "lib/types/systemSetting.types";
import { ApiQuery } from "lib/types/common/data.types";

const getSystemSettings = async (
  _dummyRequestBody: undefined,
  query: ApiQuery
): Promise<SystemSettingListingResponseType> => {
  try {
    const response = await axios.get<SystemSettingListingResponseType>(
      constructUrl(query),
      getRequestOptions()
    );
    return parseResponse(response, GET_SYSTEM_SETTINGS_URL);
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
  const param = query[Object.keys(query)[0]];

  // construct URL
  var url = `${GET_SYSTEM_SETTINGS_URL}/${param}`;
  return url;
};

export { getSystemSettings };
