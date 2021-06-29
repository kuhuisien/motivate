import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Form, Typography } from "antd";
import { PATHS } from "lib/nav/routes";
import classes from "styles/HabitCreate.module.css";
import HabitFormField, {
  formFieldNames,
} from "components/Habit/HabitFormField/HabitFormField";
import { addHabit } from "lib/api/client/habit/AddHabit/addHabit";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import { useAsync } from "lib/hooks/useAsync";

const Create = () => {
  const router = useRouter();

  const { execute, status, error } = useAsync(addHabit, false);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const taskTitle = values[formFieldNames.taskTitle];
    const notes = values[formFieldNames.notes];
    const difficulty = values[formFieldNames.difficulty];

    await execute({
      taskTitle,
      notes,
      difficultyId: difficulty,
    });
  };

  useEffect(() => {
    if (status === "success") {
      router.replace(PATHS.HABIT.path);
    }
  }, [status]);

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish}>
        <HabitFormField />

        <SubmitButton loading={status === "pending"}>CREATE</SubmitButton>

        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </Form>
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

export default Create;
