import axios from "axios";
import { ADD_HABIT_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { GeneralResponse } from "lib/types/common/data.types";

export type AddHabitRequestType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
};

const addHabit = async (
  habit: AddHabitRequestType
): Promise<GeneralResponse> => {
  try {
    const response = await axios.post<GeneralResponse>(
      ADD_HABIT_URL,
      createRequestPayload(habit),
      getRequestOptions()
    );
    return parseResponse(response, ADD_HABIT_URL);
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error?.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
    throw new Error("An error occured");
  }
};

const createRequestPayload = (habit: AddHabitRequestType) => {
  return {
    ...habit,
  };
};

export { addHabit };
