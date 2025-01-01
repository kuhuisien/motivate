import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Skeleton, Select } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useAsync } from "lib/hooks/useAsync";
import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";
import { getSystemSettings } from "lib/api/client/systemSetting/GetSystemSetting/GetSystemSetting";
import { SystemSetting } from "lib/types/systemSetting.types";
import { useGetSystemSettings } from "lib/hooks/useCounter";
import { notification } from "antd";
import { getTags } from "lib/api/client/tag/GetTags/getTags";
import { useDebounce } from "use-debounce";

interface HabitProps {
  difficultySystemSettings: SystemSetting[];
}

const MESSAGES = [
  "You did it! 🎉",
  "You’re unstoppable! 🚀",
  "Goal Unlocked! 🔓",
  "You’re on fire! 🔥",
  "High five! 🖐️",
];

const Habit = ({ difficultySystemSettings }: HabitProps) => {
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

  // save system settings to redux state
  useGetSystemSettings(difficultySystemSettings);

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
      <div className={classes.searchOrCreateContainer}>
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

        <div className={classes.createButtonContainer}>
          <SimpleButton onClick={() => router.push(PATHS.HABIT_CREATE.path)}>
            CREATE
          </SimpleButton>
        </div>
      </div>

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
          <>
            <div className={classes.habitListContainer}>
              {habitList?.map((h) => (
                <HabitCardContainer
                  key={h.taskTitle}
                  habit={h}
                  handleClick={handleHabitCardButtonClick}
                ></HabitCardContainer>
              ))}
            </div>
          </>
        )
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

  try {
    var difficultySystemSettingsResponse = await getSystemSettings(undefined, {
      category: "DIFFICULTY",
    });
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      difficultySystemSettings: difficultySystemSettingsResponse.systemSettings,
    },
  };
};

export default Habit;
