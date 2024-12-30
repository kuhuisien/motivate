import Head from "next/head";
import styles from "styles/Home.module.css";
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PATHS } from "lib/nav/routes";
import { useRouter } from "next/router";
import BoxContainer from "components/Three/BoxContainer/BoxContainer";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // redirect after 3 seconds
    const timer = setTimeout(() => {
      clearTimeout(timer);
      router.push(PATHS.HABIT.path);
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Aspiro</title>
        <meta name="description" content="Set goals and stay motivated." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BoxContainer />
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

export default Home;
