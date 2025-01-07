import axios from "axios";
import { TagListingResponseType } from "lib/types/habit.types";
import { GET_TAGS_UEL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { handleError } from "../../resource/handlers/handleError/handleError";

const getTags = async (cookie?: string): Promise<TagListingResponseType> => {
  try {
    const response = await axios.get<TagListingResponseType>(GET_TAGS_UEL, {
      ...getRequestOptions(cookie),
    });
    return parseResponse(response, GET_TAGS_UEL);
  } catch (error) {
    return handleError(error);
  }
};

export { getTags };
