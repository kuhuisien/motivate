import axios from "axios";
import { GET_OR_UPDATE_POINT_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { PointResponseType } from "lib/types/point.types";

const getPoint = async (): Promise<PointResponseType> => {
  try {
    const response = await axios.get<PointResponseType>(
      GET_OR_UPDATE_POINT_URL,
      getRequestOptions()
    );
    return parseResponse(response, GET_OR_UPDATE_POINT_URL);
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export { getPoint };
