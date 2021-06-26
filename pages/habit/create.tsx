import React, { useState } from "react";
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

const Create = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  // States for the form submission API call
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null
  );

  const onFinish = async (values: any) => {
    setSubmitIsLoading(true);

    try {
      const taskTitle = values[formFieldNames.taskTitle];
      const notes = values[formFieldNames.notes];
      const difficulty = values[formFieldNames.difficulty];

      await addHabit({
        taskTitle,
        notes,
        difficultyId: difficulty,
      });

      router.replace(PATHS.HABIT.path);
    } catch (error) {
      setSubmitErrorMessage(error.message);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish}>
        <HabitFormField />

        <SubmitButton loading={submitIsLoading}>CREATE</SubmitButton>

        {submitErrorMessage && (
          <Typography.Text type="danger">{submitErrorMessage}</Typography.Text>
        )}
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
