import axios from "axios";
import { HabitListingResponseType } from "lib/types/habit.types";
import { GET_HABITS_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { handleError } from "../../resource/handlers/handleError/handleError";

export interface getHabitsInput {
  tags?: string[];
}

const getHabits = async (
  inputs?: getHabitsInput
): Promise<HabitListingResponseType> => {
  try {
    const { tags } = inputs || {};
    const response = await axios.get<HabitListingResponseType>(GET_HABITS_URL, {
      ...getRequestOptions(),
      params: { tags },
    });
    return parseResponse(response, GET_HABITS_URL);
  } catch (error) {
    return handleError(error);
  }
};

export { getHabits };
