import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Form } from "antd";
import { PATHS } from "lib/nav/routes";
import classes from "styles/HabitCreate.module.css";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import HabitFormField from "components/Habit/HabitFormField/HabitFormField";

const Create = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const onChange = (changedValues: any, values: any) => {
    console.log(values);
  };

  return (
    <div className={classes.container}>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={onChange}
        onFinishFailed={onFinish}
      >
        <HabitFormField />

        <SimpleButton htmlType="submit">CREATE</SimpleButton>
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
