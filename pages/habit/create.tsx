import React from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { Form, Typography } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import TextField from "components/FormInputs/TextField/TextField";
import TextArea from "components/FormInputs/TextArea/Textarea";
import RadioButton from "components/FormInputs/RadioButton/RadioButton";
import { RadioType } from "components/FormInputs/RadioButton/RadioButton.types";
import { PATHS } from "lib/nav/routes";
import {
  DIFFICULTY_ID,
  EASY_ICON,
  MEDIUM_ICON,
  HARD_ICON,
} from "components/Habit/HabitCard/constant";
import classes from "styles/HabitCreate.module.css";

const RADIO_BUTTON_ICON_SIZE = 50;

const Create = () => {
  const [form] = Form.useForm();

  const formFieldNames = {
    taskTitle: "taskTitle",
    notes: "notes",
    difficulty: "difficulty",
  };

  const taskNature: RadioType[] = [
    {
      id: DIFFICULTY_ID.EASY,
      body: (
        <div className={classes.difficulty}>
          <Image
            src={EASY_ICON}
            alt={DIFFICULTY_ID.EASY}
            width={RADIO_BUTTON_ICON_SIZE}
            height={RADIO_BUTTON_ICON_SIZE}
          />
          <Typography.Text className={classes.difficultyText}>
            EASY
          </Typography.Text>
        </div>
      ),
    },
    {
      id: DIFFICULTY_ID.MEDIUM,
      body: (
        <div className={classes.difficulty}>
          <Image
            src={MEDIUM_ICON}
            alt={DIFFICULTY_ID.MEDIUM}
            width={RADIO_BUTTON_ICON_SIZE}
            height={RADIO_BUTTON_ICON_SIZE}
          />
          <Typography.Text className={classes.difficultyText}>
            MEDIUM
          </Typography.Text>
        </div>
      ),
    },
    {
      id: DIFFICULTY_ID.HARD,
      body: (
        <div className={classes.difficulty}>
          <Image
            src={HARD_ICON}
            alt={DIFFICULTY_ID.HARD}
            width={RADIO_BUTTON_ICON_SIZE}
            height={RADIO_BUTTON_ICON_SIZE}
          />
          <Typography.Text className={classes.difficultyText}>
            HARD
          </Typography.Text>
        </div>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const onChange = (changedValues: any, values: any) => {
    console.log(values);
  };

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish} onValuesChange={onChange}>
        <TextField
          name={formFieldNames.taskTitle}
          placeholder="Task Title"
        ></TextField>

        <TextArea
          name={formFieldNames.notes}
          rows={3}
          placeholder="Notes"
        ></TextArea>

        <RadioButton
          name={formFieldNames.difficulty}
          values={taskNature}
          defaultValue={taskNature[0].id}
        ></RadioButton>

        <SimpleButton>CREATE</SimpleButton>
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
