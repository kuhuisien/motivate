import classes from "styles/Home.module.css";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PATHS } from "lib/nav/routes";
import { useRouter } from "next/router";
import { getSystemSettings } from "lib/api/client/systemSetting/GetSystemSetting/GetSystemSetting";
import Cube from "components/Cube/Cube";
import { SystemSetting } from "lib/types/systemSetting.types";
import { useGetSystemSettings } from "lib/hooks/useGetSystemSettings";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabitList } from "lib/redux/habit/habitThunk";
import { habitListIsLoadingSelector } from "lib/redux/habit/habitSlice";

interface HomeProps {
  difficultySystemSettings: SystemSetting[];
}

const Home = ({ difficultySystemSettings }: HomeProps) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const isLoading = useSelector(habitListIsLoadingSelector);

  // save system settings to redux state
  useGetSystemSettings(difficultySystemSettings);

  useEffect(() => {
    if (isLoading === null) {
      dispatch(fetchHabitList());
    }
    if (isLoading === false) {
      router.replace(PATHS.HABIT.path);
    }
  }, [isLoading]);

  return (
    <div className={classes.container}>
      <Cube />
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
    console.error(error);
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

export default Home;
