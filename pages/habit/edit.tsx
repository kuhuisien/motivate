import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { Form } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/HabitEdit.module.css";
import { useSelector } from "react-redux";
import { habitSelector } from "lib/redux/store/habit/habitSlice";
import HabitFormField from "components/Habit/HabitFormField/HabitFormField";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Edit = () => {
  const habitState = useSelector(habitSelector).selectedHabit;

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
  };

  function showConfirm() {
    confirm({
      title: "Are you sure to delete?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
        <HabitFormField habitState={habitState}></HabitFormField>

        <SimpleButton htmlType="submit">SAVE</SimpleButton>

        <div className={classes.deleteButton}>
          <SimpleButton type="dashed" onClick={showConfirm}>
            DELETE
          </SimpleButton>
        </div>
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

export default Edit;
