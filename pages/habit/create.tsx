import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Form, Typography } from "antd";
import { PATHS } from "lib/nav/routes";
import { addHabit } from "lib/api/client/habit/AddHabit/addHabit";
import { useMutateRequest } from "lib/hooks/common/useMutationRequest";
import { formFieldNames } from "components/Habit/HabitFormField/HabitFormField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import HabitFormFieldContainer from "components/Habit/HabitFormField/HabitFormFieldContainer";
import classes from "styles/HabitCreate.module.css";

const Create = () => {
  const router = useRouter();

  const [tags, setTags] = useState<string[]>([]);

  const { execute, status, error } = useMutateRequest(addHabit);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const taskTitle = values[formFieldNames.taskTitle];
    const notes = values[formFieldNames.notes];
    const difficulty = values[formFieldNames.difficulty];

    await execute(
      {
        taskTitle,
        notes,
        difficultyId: difficulty,
        tags,
      },
      undefined
    );
  };

  useEffect(() => {
    if (status === "success") {
      router.replace(PATHS.HABIT.path);
    }
  }, [status]);

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish}>
        <HabitFormFieldContainer tags={tags} setTags={setTags} />

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
