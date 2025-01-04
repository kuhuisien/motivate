import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton, Select } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useGetRequest } from "lib/hooks/useGetRequest";
import { getTags } from "lib/api/client/tag/GetTags/getTags";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  habitListIsLoadingSelector,
  habitListErrorSelector,
  habitListSelector,
  habitListHasMoreSelector,
} from "lib/redux/habit/habitSlice";
import { fetchHabitList, fetchMoreHabitList } from "lib/redux/habit/habitThunk";

const INTERCEPTION_OBSERVER_OPTION = {
  threshold: 0.8,
};

const Habit = () => {
  const habitListEndRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const habitList = useSelector(habitListSelector);
  const isLoadingHabitList = useSelector(habitListIsLoadingSelector);
  const errorHabitList = useSelector(habitListErrorSelector);
  const hasMore = useSelector(habitListHasMoreSelector);

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

  // fetch and append habit list when user scrolls down
  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      INTERCEPTION_OBSERVER_OPTION
    );
    if (habitListEndRef.current) {
      observer.observe(habitListEndRef.current);
    }

    return () => {
      if (habitListEndRef.current) {
        observer.unobserve(habitListEndRef.current);
      }
    };
  }, [habitListEndRef.current, INTERCEPTION_OBSERVER_OPTION]);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((x) => {
      console.log(x);
      if (x.isIntersecting) {
        dispatch(fetchMoreHabitList({ tags: debouncedSearchingTag }));
      }
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
            ></HabitCardContainer>
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={habitListEndRef} className={classes.loadMore}>
          Load more...
        </div>
      )}
    </div>
  );
};

export default Habit;
