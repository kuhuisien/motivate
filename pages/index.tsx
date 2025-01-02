import classes from "styles/Home.module.css";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PATHS } from "lib/nav/routes";
import { useRouter } from "next/router";
import { getSystemSettings } from "lib/api/client/systemSetting/GetSystemSetting/GetSystemSetting";
import Cube from "components/Cube/Cube";
import { SystemSetting } from "lib/types/systemSetting.types";
import { useGetSystemSettings } from "lib/hooks/useCounter";

interface HomeProps {
  difficultySystemSettings: SystemSetting[];
}

const Home = ({ difficultySystemSettings }: HomeProps) => {
  const router = useRouter();

  // save system settings to redux state
  useGetSystemSettings(difficultySystemSettings);

  useEffect(() => {
    // redirect after 3 seconds
    const timer = setTimeout(() => {
      clearTimeout(timer);
      router.replace(PATHS.HABIT.path);
    }, 3000);
  }, []);

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
