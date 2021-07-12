import axios from "axios";
import { EDIT_HABIT_URL } from "../../resource/configs/URL";
import { getRequestOptions } from "../../resource/configs/requests";
import { parseResponse } from "../../resource/handlers/parseResponse/parseResponse";
import { GeneralResponse, ApiQuery } from "lib/types/common/data.types";

type EditHabitRequestType = {
  taskTitle: string | null;
  notes: string | null;
  difficultyId: string | null;
};

const updateHabit = async (
  habit: EditHabitRequestType,
  query: ApiQuery
): Promise<GeneralResponse> => {
  try {
    const response = await axios.put<GeneralResponse>(
      constructUrl(query),
      createRequestPayload(habit),
      getRequestOptions()
    );
    return parseResponse(response, EDIT_HABIT_URL);
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const constructUrl = (query: ApiQuery) => {
  // get first parameter
  const id = query[Object.keys(query)[0]];

  // encode query parameter value
  const encodedQueryValue = encodeURIComponent(id);

  // construct URL
  var url = `${EDIT_HABIT_URL}/${encodedQueryValue}`;
  return url;
};

const createRequestPayload = (habit: EditHabitRequestType) => {
  return {
    ...habit,
  };
};

export { updateHabit };
