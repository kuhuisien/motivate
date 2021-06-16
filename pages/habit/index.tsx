import Head from "next/head";
import styles from "styles/Home.module.css";
import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { PATHS } from "lib/nav/routes";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { useRouter } from "next/router";

const Habit = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SimpleButton onClick={() => router.push(PATHS.HABIT_CREATE.path)}>
        CREATE
      </SimpleButton>
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

export default Habit;
