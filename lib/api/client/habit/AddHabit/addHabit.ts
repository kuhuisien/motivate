import axios from "axios";
import { GeneralResponse } from "lib/types/data.types";
import { ADD_HABIT_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";

type AddHabitRequestType = {
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
    const errorMessage = error?.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const createRequestPayload = (habit: AddHabitRequestType) => {
  return {
    ...habit,
  };
};

export { addHabit };
