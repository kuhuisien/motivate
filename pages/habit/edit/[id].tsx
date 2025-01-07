import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Form, Typography, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ID_PARAM, PATHS } from "lib/nav/routes";
import { getCookieFromContext } from "lib/api/server/util";
import { getHabit } from "lib/api/client/habit/GetHabit/getHabit";
import { updateHabit } from "lib/api/client/habit/UpdateHabit/updateHabit";
import { deleteHabit } from "lib/api/client/habit/DeleteHabit/deleteHabit";
import { useMutateRequest } from "lib/hooks/common/useMutationRequest";
import HabitFormFieldContainer from "components/Habit/HabitFormField/HabitFormFieldContainer";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { formFieldNames } from "components/Habit/HabitFormField/HabitFormField";
import { HabitType } from "lib/types/habit.types";
import classes from "styles/HabitEdit.module.css";

interface HabitProps {
  habit: HabitType;
}

const { confirm } = Modal;

const Edit = ({ habit }: HabitProps) => {
  const params = useParams<{ id: string }>();

  const habitId = params[ID_PARAM];

  const router = useRouter();

  const [tags, setTags] = useState<string[]>(habit?.tags || []);

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
      { id: habitId }
    );
  };

  function showConfirm() {
    confirm({
      title: "Are you sure to delete?",
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await deleteExecute(undefined, { id: habitId });
      },
      onCancel() {},
    });
  }
  useEffect(() => {
    if (editStatus === "success" || deleteStatus === "success") {
      router.replace(PATHS.HABIT.path);
    }
  }, [editStatus, deleteStatus]);

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinish}>
        <HabitFormFieldContainer
          habitState={habit}
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

  const cookie = getCookieFromContext(context);

  const id = context.params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    var habit = await getHabit(id, cookie);
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: { habit },
  };
};

export default Edit;
