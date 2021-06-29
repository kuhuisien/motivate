import axios from "axios";
import { HabitListingResponseType } from "lib/types/habit.types";
import { GET_HABITS_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";

const getHabits = async (): Promise<HabitListingResponseType> => {
  try {
    const response = await axios.get<HabitListingResponseType>(
      GET_HABITS_URL,
      getRequestOptions()
    );
    return parseResponse(response, GET_HABITS_URL);
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export { getHabits };
