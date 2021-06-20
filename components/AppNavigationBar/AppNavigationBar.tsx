import React from "react";
import { Menu, Typography, Button } from "antd";
import { NavigationBarItem } from "./AppNavigationBar.types";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { signOut, useSession } from "next-auth/client";
import { PATHS } from "lib/nav/routes";
import { retrievePath } from "lib/nav/retrievePath";
import classes from "./AppNavigationBar.module.css";

const NavItems: NavigationBarItem[] = [
  {
    id: PATHS.HABIT.path,
    text: PATHS.HABIT.displayName,
    icon: <SettingOutlined />,
  },
  {
    id: PATHS.TODOS.path,
    text: PATHS.TODOS.displayName,
    icon: <SettingOutlined />,
  },
  {
    id: PATHS.REWARDS.path,
    text: PATHS.REWARDS.displayName,
    icon: <MailOutlined />,
  },
];

const AppNavigationBar = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const path = retrievePath(pathname);

  const [session] = useSession();

  const showMainNav =
    pathname === PATHS.HOME.path ||
    NavItems.find((n) => n.id == pathname) !== undefined;

  const title = path?.displayName;
  const showBackButton = path?.allowGoBackInHistory;
  const goBack = () => router.back();

  return (
    <>
      {showMainNav ? (
        <Menu selectedKeys={[pathname]} mode="horizontal">
          {NavItems.map((item) => (
            <Menu.Item key={item.id} icon={item.icon}>
              <Link href={item.id}>{item.text}</Link>
            </Menu.Item>
          ))}
          {session && (
            <Menu.Item key={"logout"}>
              <SimpleButton onClick={() => signOut()}>Logout</SimpleButton>
            </Menu.Item>
          )}
        </Menu>
      ) : (
        <div className={classes.flexBox}>
          {showBackButton && (
            <Button className={classes.backButtonContainer} onClick={goBack}>
              <RollbackOutlined className={classes.backButton} />
            </Button>
          )}

          <Typography.Title level={3} className={classes.title}>
            {title}
          </Typography.Title>
        </div>
      )}
    </>
  );
};

export default AppNavigationBar;
