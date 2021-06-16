import React from "react";
import { Menu, Typography } from "antd";
import { NavigationBarItem } from "./AppNavigationBar.types";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
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
    icon: <MailOutlined />,
  },
  {
    id: PATHS.DAILIES.path,
    text: PATHS.DAILIES.displayName,
    icon: <AppstoreOutlined />,
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
  const pathname = useRouter().pathname;
  const path = retrievePath(pathname);

  const [session] = useSession();

  const showMainNav =
    pathname === PATHS.HOME.path ||
    NavItems.find((n) => n.id == pathname) !== undefined;

  const title = path?.displayName;

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
          <Typography.Title level={3}>{title}</Typography.Title>
        </div>
      )}
    </>
  );
};

export default AppNavigationBar;
