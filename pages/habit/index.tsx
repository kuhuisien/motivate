import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Space } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { DIFFICULTY_ID } from "components/Habit/HabitCard/constant";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { HabitType } from "lib/types/data.types";

const MOCK_HABITS: HabitType[] = [
  {
    taskTitle: "testing task title",
    notes: "dummy notes",
    difficultyId: DIFFICULTY_ID.EASY,
    createdAt: new Date(),
  },
  {
    taskTitle: "testing task title2",
    notes: "dummy notes2",
    difficultyId: DIFFICULTY_ID.EASY,
    createdAt: new Date(),
  },
];

const Habit = () => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <Space direction="vertical" align="center" className={classes.habit}>
        {MOCK_HABITS.map((h) => (
          <HabitCardContainer key={h.taskTitle} habit={h}></HabitCardContainer>
        ))}

        <SimpleButton onClick={() => router.push(PATHS.HABIT_CREATE.path)}>
          CREATE
        </SimpleButton>
      </Space>
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
