import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton, Select } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useAsync } from "lib/hooks/useAsync";
import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";
import { notification } from "antd";
import { getTags } from "lib/api/client/tag/GetTags/getTags";
import { useDebounce } from "use-debounce";

const MESSAGES = [
  "You did it! 🎉",
  "You’re unstoppable! 🚀",
  "Goal Unlocked! 🔓",
  "You’re on fire! 🔥",
  "High five! 🖐️",
];

const Habit = () => {
  const router = useRouter();

  const [searchingTags, setSearchingTags] = useState<string[]>([]);

  const handleSelectTagListChange = (value: string[]) => {
    setSearchingTags(value);
  };

  const [debouncedSearchingTag] = useDebounce(searchingTags, 1000);

  const { value: getTagsValue } = useAsync(getTags);

  const selectOptionList =
    getTagsValue?.tagList.map((x) => {
      return { label: x, value: x };
    }) || [];

  const isSelectTaggingVisible = selectOptionList.length > 0;

  const {
    execute: getHabitsExecute,
    status: getHabitsStatus,
    value: getHabitsValue,
    error: getHabitsError,
  } = useAsync(getHabits, true, { tags: searchingTags });

  useEffect(() => {
    getHabitsExecute({ tags: debouncedSearchingTag });
  }, [debouncedSearchingTag]);

  const habitList = getHabitsValue?.habitList;

  // callback invoked when habit card button is clicked
  const handleHabitCardButtonClick = (increment: number) => {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    const notificationMsg = MESSAGES[randomIndex];

    notification.open({
      message: notificationMsg,
      placement: "bottomRight",
      duration: 2,
    });
  };

  return (
    <div className={classes.container}>
      {habitList?.length === 0 && (
        <div className={classes.emptyMsgContainer}>
          No item yet, create today!
        </div>
      )}
      <div className={classes.createButtonContainer}>
        <SimpleButton
          block
          onClick={() => router.push(PATHS.HABIT_CREATE.path)}
        >
          CREATE NEW
        </SimpleButton>
      </div>

      {isSelectTaggingVisible && (
        <Select
          mode="multiple"
          allowClear
          className={classes.select}
          placeholder="Search by tags"
          onChange={handleSelectTagListChange}
          options={selectOptionList}
        />
      )}

      {getHabitsStatus === "pending" ? (
        <Skeleton
          active
          paragraph={{ rows: 8 }}
          className={classes.habitSkeleton}
        />
      ) : getHabitsStatus === "error" ? (
        <div
          className="error"
          onClick={() => getHabitsExecute({ tags: searchingTags })}
        >
          {getHabitsError}
        </div>
      ) : (
        getHabitsStatus === "success" && (
          <div>
            {habitList?.map((h) => (
              <HabitCardContainer
                key={h.taskTitle}
                habit={h}
                handleClick={handleHabitCardButtonClick}
              ></HabitCardContainer>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Habit;
