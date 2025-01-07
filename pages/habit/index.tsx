import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Skeleton, Select } from "antd";
import { useDebounce } from "use-debounce";
import { PATHS } from "lib/nav/routes";
import { getCookieFromContext } from "lib/api/server/util";
import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";
import { getTags } from "lib/api/client/tag/GetTags/getTags";
import { useGetHabits } from "lib/hooks/useGetHabits";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { HabitListingResponseType } from "lib/types/habit.types";
import classes from "styles/Habit.module.css";

const INTERCEPTION_OBSERVER_OPTION = {
  threshold: 0.8,
};

interface HabitProps {
  tagList: string[];
  habitListResOnLoad: HabitListingResponseType;
}

const Habit = ({ tagList = [], habitListResOnLoad }: HabitProps) => {
  const habitListEndRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const [searchingTags, setSearchingTags] = useState<string[]>([]);
  const [seachViaTagHelper, setSearchViaTagHelper] = useState(false);

  const handleSelectTagListChange = (value: string[]) => {
    setSearchViaTagHelper(true);
    setSearchingTags(value);
  };

  const [debouncedSearchingTag] = useDebounce(searchingTags, 1000);

  const {
    habitList,
    isReloadingHabitList,
    errorReloadHabitList,
    hasMore,
    reloadHabitList,
    appendHabitList,
  } = useGetHabits({
    habitListResOnLoad,
    tags: debouncedSearchingTag,
  });

  const selectOptionList =
    tagList.map((x) => {
      return { label: x, value: x };
    }) || [];

  const isSelectTaggingVisible = selectOptionList.length > 0;

  // fetch habit list via tagging
  useEffect(() => {
    if (seachViaTagHelper) {
      reloadHabitList();
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
  }, [habitListEndRef.current, hasMore]);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((x) => {
      if (x.isIntersecting) {
        appendHabitList();
      }
    });
  };

  return (
    <div className={classes.container}>
      {!isReloadingHabitList && habitList.length === 0 && (
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

      {isReloadingHabitList ? (
        <Skeleton />
      ) : errorReloadHabitList ? (
        <div className="error" onClick={reloadHabitList}>
          {errorReloadHabitList}
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

      {!isReloadingHabitList && hasMore && (
        <div ref={habitListEndRef} className={classes.loadMore}>
          Load more...
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: PATHS.LOGIN.path,
        permanent: false,
      },
    };
  }

  var tagList: string[] = [];
  const cookie = getCookieFromContext(context);

  try {
    const tagsResponse = await getTags(cookie);
    tagList = tagsResponse.tagList;
  } catch (error) {
    console.error(error);
  }

  try {
    var habitListResOnLoad = await getHabits(undefined, cookie);
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tagList,
      habitListResOnLoad,
    },
  };
};

export default Habit;
