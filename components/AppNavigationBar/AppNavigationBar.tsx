import React from "react";
import { Typography, Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { signOut, useSession } from "next-auth/react";
import { retrievePath } from "lib/nav/retrievePath";
import classes from "./AppNavigationBar.module.css";

const APP_NAME = "Aspiro";

const AppNavigationBar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const path = retrievePath(pathname);

  const { data: session } = useSession();

  const title = path?.displayName || APP_NAME;

  const showBackButton = path?.allowGoBackInHistory;
  const goBack = () => router.back();

  return (
    <>
      {
        <div className={classes.header}>
          {showBackButton && (
            <Button className={classes.backButtonContainer} onClick={goBack}>
              <RollbackOutlined className={classes.backButton} />
            </Button>
          )}

          <Typography.Title level={3} className={classes.title}>
            {title}
          </Typography.Title>

          {session && (
            <div className={classes.logoutButton}>
              <SimpleButton onClick={() => signOut()}>Logout</SimpleButton>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default AppNavigationBar;
