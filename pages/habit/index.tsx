import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Space, Skeleton } from "antd";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { PATHS } from "lib/nav/routes";
import classes from "styles/Habit.module.css";
import HabitCardContainer from "components/Habit/HabitCard/HabitCardContainer";
import { useAsync } from "lib/hooks/useAsync";
import { getHabits } from "lib/api/client/habit/GetHabits/getHabits";
import { getSystemSettings } from "lib/api/client/systemSetting/GetSystemSetting/GetSystemSetting";
import { SystemSetting } from "lib/types/systemSetting.types";
import { useGetSystemSettings } from "lib/hooks/useCounter";
import { getPoint } from "lib/api/client/point/GetPoint/GetPoint";
import { updatePoint } from "lib/api/client/point/UpdatePoint/updatePoint";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

interface HabitProps {
  difficultySystemSettings: SystemSetting[];
}

const Habit = ({ difficultySystemSettings }: HabitProps) => {
  const router = useRouter();

  const {
    execute: getHabitsExecute,
    status: getHabitsStatus,
    value: getHabitsValue,
    error: getHabitsError,
  } = useAsync(getHabits);

  const {
    execute: getPointExecute,
    status: getPointStatus,
    value: getPointValue,
    error: getPointError,
  } = useAsync(getPoint);

  const { execute: updatePointExecute, value: updatePointValue } = useAsync(
    updatePoint,
    false
  );

  const habitList = getHabitsValue?.habitList;

  // save system settings to redux state
  useGetSystemSettings(difficultySystemSettings);

  const [point, setPoint] = useState<number>(0);

  // set user point on page load
  useEffect(() => {
    if (getPointValue) {
      setPoint(getPointValue.point);
    }
  }, [getPointValue]);

  // callback invoked when habit card button is clicked
  const handleHabitCardButtonClick = async (increment: number) => {
    const updatedPoint = point + increment;
    setPoint(updatedPoint);

    await updatePointExecute({ point: updatedPoint });
  };

  // display any notification message after updating point
  useEffect(() => {
    if (updatePointValue?.notificationMsg) {
      openNotification(updatePointValue?.notificationMsg);
    }
  }, [updatePointValue]);

  const openNotification = (notificationMsg: string) => {
    notification.open({
      message: "You unlocked a prize!",
      description: notificationMsg,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "bottomRight",
      duration: 3,
    });
  };

  return (
    <div className={classes.container}>
      {getHabitsStatus === "pending" || getPointStatus === "pending" ? (
        <>
          <Skeleton
            active
            paragraph={{ rows: 8 }}
            className={classes.habitSkeleton}
          />
        </>
      ) : getHabitsStatus === "error" ? (
        <div onClick={() => getHabitsExecute()}>{getHabitsError}</div>
      ) : getPointStatus === "error" ? (
        <div onClick={() => getPointExecute()}>{getPointError}</div>
      ) : (
        getHabitsStatus === "success" &&
        getPointStatus === "success" && (
          <>
            <Space
              direction="vertical"
              align="center"
              className={classes.habit}
            >
              {habitList?.map((h) => (
                <HabitCardContainer
                  key={h.taskTitle}
                  habit={h}
                  handleClick={handleHabitCardButtonClick}
                ></HabitCardContainer>
              ))}

              <SimpleButton
                onClick={() => router.push(PATHS.HABIT_CREATE.path)}
              >
                CREATE
              </SimpleButton>
            </Space>
          </>
        )
      )}
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

  try {
    var difficultySystemSettingsResponse = await getSystemSettings(undefined, {
      category: "DIFFICULTY",
    });
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      difficultySystemSettings: difficultySystemSettingsResponse.systemSettings,
    },
  };
};

export default Habit;
