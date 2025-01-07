import React from "react";
import { Typography } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { signOut, useSession } from "next-auth/react";
import { useRetrievePath } from "lib/hooks/common/useRetrivePath/useRetrievePath";
import classes from "./AppNavigationBar.module.css";

const APP_NAME = "Aspiro";

const AppNavigationBar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const path = useRetrievePath(pathname);

  const { data: session } = useSession();

  const title = path?.displayName || APP_NAME;

  const showBackButton = path?.allowGoBackInHistory;
  const goBack = () => router.back();
  const onClickSignOutButton = () => signOut();

  return (
    <div className={classes.header}>
      {showBackButton && (
        <div className={classes.backButtonContainer}>
          <SimpleButton
            aria-label="Go back"
            withBorder={false}
            type="default"
            onClick={goBack}
          >
            <RollbackOutlined className={classes.backButton} />
          </SimpleButton>
        </div>
      )}

      <Typography.Title level={3} className={classes.title}>
        {title}
      </Typography.Title>

      {session && (
        <div className={classes.logoutButton}>
          <SimpleButton onClick={onClickSignOutButton}>Logout</SimpleButton>
        </div>
      )}
    </div>
  );
};

export default AppNavigationBar;
