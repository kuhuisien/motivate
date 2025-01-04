import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton, Select } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useGetRequest } from "lib/hooks/useGetRequest";
import { notification } from "antd";
import { getTags } from "lib/api/client/tag/GetTags/getTags";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  habitListIsLoadingSelector,
  habitListErrorSelector,
  habitListSelector,
} from "lib/redux/habit/habitSlice";
import { fetchHabitList } from "lib/redux/habit/habitThunk";

const MESSAGES = [
  "You did it! 🎉",
  "You’re unstoppable! 🚀",
  "Goal Unlocked! 🔓",
  "You’re on fire! 🔥",
  "High five! 🖐️",
];

const Habit = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const habitList = useSelector(habitListSelector);
  const isLoadingHabitList = useSelector(habitListIsLoadingSelector);
  const errorHabitList = useSelector(habitListErrorSelector);

  const [searchingTags, setSearchingTags] = useState<string[]>([]);
  const [seachViaTagHelper, setSearchViaTagHelper] = useState(false);

  const handleSelectTagListChange = (value: string[]) => {
    setSearchViaTagHelper(true);
    setSearchingTags(value);
  };

  const [debouncedSearchingTag] = useDebounce(searchingTags, 1000);

  const { value: getTagsValue } = useGetRequest(getTags, true, undefined);

  const selectOptionList =
    getTagsValue?.tagList.map((x) => {
      return { label: x, value: x };
    }) || [];

  const isSelectTaggingVisible = selectOptionList.length > 0;

  const searchHabitListViaTags = () =>
    dispatch(fetchHabitList({ tags: debouncedSearchingTag }));

  // fetch habit list via tagging
  useEffect(() => {
    if (seachViaTagHelper) {
      searchHabitListViaTags();
    }
  }, [debouncedSearchingTag]);

  // callback invoked when habit card button is clicked
  const handleHabitCardButtonClick = () => {
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
      {!isLoadingHabitList && habitList.length === 0 && (
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

      {isLoadingHabitList ? (
        <Skeleton
          active
          paragraph={{ rows: 8 }}
          className={classes.habitSkeleton}
        />
      ) : errorHabitList ? (
        <div className="error" onClick={searchHabitListViaTags}>
          {errorHabitList}
        </div>
      ) : (
        <div>
          {habitList.map((h) => (
            <HabitCardContainer
              key={h.taskTitle}
              habit={h}
              handleClick={handleHabitCardButtonClick}
            ></HabitCardContainer>
          ))}
        </div>
      )}
    </div>
  );
};

export default Habit;
