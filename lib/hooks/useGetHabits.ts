import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";
import { GENERIC_ERROR_MESSAGE } from "lib/api/client/resource/handlers/errorMessage";
import { HabitListingResponseType } from "lib/types/habit.types";
import { useState } from "react";

interface useGetHabitsProps {
  habitListResOnLoad: HabitListingResponseType;
  tags: string[];
}

/**
 * custom hook for handling reloading and appending habit item on Habits page
 */
export const useGetHabits = ({
  habitListResOnLoad,
  tags,
}: useGetHabitsProps) => {
  const [habitList, setHabitList] = useState(habitListResOnLoad.habitList);
  const [pagination, setPagination] = useState(habitListResOnLoad.pagination);

  const [isReloadingHabitList, setIsReloadingHabitList] = useState(false);
  const [errorReloadHabitList, setErrorReloadHabitList] = useState("");

  const hasMore = habitList.length < (pagination?.totalSize || 0);

  const reloadHabitList = async () => {
    setIsReloadingHabitList(true);

    try {
      const { habitList, pagination } = await getHabits({ tags });
      setPagination(pagination);
      setHabitList(habitList);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
      setErrorReloadHabitList(errorMsg);
    } finally {
      setIsReloadingHabitList(false);
    }
  };

  const appendHabitList = async () => {
    try {
      const currentPageNumber = pagination?.pageNumber || 1;
      const { habitList, pagination: newPagination } = await getHabits({
        tags,
        pageNumber: currentPageNumber + 1,
      });
      setPagination(newPagination);
      setHabitList((x) => {
        return [...x, ...habitList];
      });
    } catch (error) {}
  };

  return {
    habitList,
    isReloadingHabitList,
    errorReloadHabitList,
    hasMore,
    reloadHabitList,
    appendHabitList,
  };
};
