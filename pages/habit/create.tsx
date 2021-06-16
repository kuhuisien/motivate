import styles from "styles/Habit.module.css";
import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { PATHS } from "lib/nav/routes";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import TextField from "components/FormInputs/TextField/TextField";
import TextArea from "components/FormInputs/TextArea/Textarea";
import { Form, Typography } from "antd";
import RadioButton from "components/FormInputs/RadioButton/RadioButton";
import { Radio } from "components/FormInputs/RadioButton/RadioButton.types";
import Image from "next/image";
//import { PositiveIcon } from "lib/img/index";
import PositiveIcon from "./common/positive.svg";

const Create = () => {
  const [form] = Form.useForm();

  const formFieldNames = {
    taskTitle: "taskTitle",
    notes: "notes",
    nature: "nature",
  };

  const taskNature: Radio[] = [
    {
      id: "p",
      body: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Image src="/lib/img/common/positive.svg" height={30} width={30} />
          {/* <Typography.Text>Positive</Typography.Text> */}
        </div>
      ),
    },
    { id: "n", body: "negative" },
  ];

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const onChange = (changedValues: any, values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
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
          name={formFieldNames.nature}
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
