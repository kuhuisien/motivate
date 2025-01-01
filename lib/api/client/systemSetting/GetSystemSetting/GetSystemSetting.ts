import axios from "axios";
import { GET_SYSTEM_SETTINGS_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { SystemSettingListingResponseType } from "lib/types/systemSetting.types";
import { ApiQuery } from "lib/types/common/data.types";
import { handleError } from "../../resource/handlers/handleError/handleError";

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
    return handleError(error);
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
