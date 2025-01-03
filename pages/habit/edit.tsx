import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Form, Typography } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/HabitEdit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { habitSelector } from "lib/redux/habit/habitSlice";
import { formFieldNames } from "components/Habit/HabitFormField/HabitFormField";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { updateHabit } from "lib/api/client/habit/UpdateHabit/updateHabit";
import { useRouter } from "next/router";
import { HabitType } from "lib/types/habit.types";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import { deleteHabit } from "lib/api/client/habit/DeleteHabit/deleteHabit";
import HabitFormFieldContainer from "components/Habit/HabitFormField/HabitFormFieldContainer";
import { useMutateRequest } from "lib/hooks/useMutationRequest";
import { fetchHabitList } from "lib/redux/habit/habitThunk";

const { confirm } = Modal;

const Edit = () => {
  const dispatch = useDispatch();

  const habitState: HabitType = useSelector(habitSelector);

  const router = useRouter();

  const [tags, setTags] = useState<string[]>(habitState.tags || []); // to track the list of tags

  const {
    execute: editExecute,
    status: editStatus,
    error: editError,
  } = useMutateRequest(updateHabit);

  const {
    execute: deleteExecute,
    status: deleteStatus,
    error: deleteError,
  } = useMutateRequest(deleteHabit);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const taskTitle = values[formFieldNames.taskTitle];
    const notes = values[formFieldNames.notes];
    const difficulty = values[formFieldNames.difficulty];

    await editExecute(
      {
        taskTitle,
        notes,
        difficultyId: difficulty,
        tags,
      },
      { id: habitState.id }
    );
  };

  function showConfirm() {
    confirm({
      title: "Are you sure to delete?",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await deleteExecute(undefined, { id: habitState.id });
      },
      onCancel() {},
    });
  }
  useEffect(() => {
    if (editStatus === "success" || deleteStatus === "success") {
      dispatch(fetchHabitList());
      router.replace(PATHS.HABIT.path);
    }
  }, [editStatus, deleteStatus]);

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
        <HabitFormFieldContainer
          habitState={habitState}
          tags={tags}
          setTags={setTags}
        ></HabitFormFieldContainer>

        <div className={classes.buttons}>
          <SubmitButton loading={editStatus === "pending"}>SAVE</SubmitButton>

          <div className={classes.deleteButton}>
            <SimpleButton type="dashed" onClick={showConfirm}>
              DELETE
            </SimpleButton>
          </div>
        </div>

        {editError && (
          <Typography.Text type="danger">{editError}</Typography.Text>
        )}

        {deleteError && (
          <Typography.Text type="danger">{deleteError}</Typography.Text>
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

export default Edit;
