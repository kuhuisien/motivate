import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Space, Skeleton } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useAsync } from "lib/hooks/useAsync";
import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";

const Habit = () => {
  const router = useRouter();

  const { execute, status, value, error } = useAsync(getHabits);

  const habitList = value?.habitList;

  return (
    <div className={classes.container}>
      {status === "pending" ? (
        <>
          <Skeleton
            active
            paragraph={{ rows: 8 }}
            className={classes.habitSkeleton}
          />
        </>
      ) : status === "error" ? (
        <div onClick={() => execute()}>{error}</div>
      ) : (
        status === "success" && (
          <>
            <Space
              direction="vertical"
              align="center"
              className={classes.habit}
            >
              {habitList?.map((h) => (
                <HabitCardContainer
                  key={h.taskTitle}
                  habit={h}
                ></HabitCardContainer>
              ))}

              <SimpleButton
                onClick={() => router.push(PATHS.HABIT_CREATE.path)}
              >
                CREATE
              </SimpleButton>
            </Space>
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

  return {
    props: {},
  };
};

export default Habit;
