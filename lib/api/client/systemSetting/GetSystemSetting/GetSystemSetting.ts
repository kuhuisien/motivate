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
    const errorMessage = error?.response?.data?.message;
    const statusCode = error?.response?.status;
    console.error(errorMessage);
    console.error(statusCode);
    throw new Error(`${errorMessage} (status code: ${statusCode})`);
  }
};

const constructUrl = (query: ApiQuery) => {
  // get first parameter
  const param = query[Object.keys(query)[0]];

  // construct URL
  var url = `${GET_SYSTEM_SETTINGS_URL}/${param}`;
  console.log("debug getSystemSettings URL: ", url);
  return url;
};

export { getSystemSettings };
