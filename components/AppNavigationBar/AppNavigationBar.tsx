import React from "react";
import { Menu } from "antd";
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
import { routes } from "lib/nav/routes";

const NavItems: NavigationBarItem[] = [
  { id: routes.home, text: "Habits", icon: <MailOutlined /> },
  { id: routes.dailies, text: "Dailies", icon: <AppstoreOutlined /> },
  { id: routes.todos, text: "To Do's", icon: <SettingOutlined /> },
  { id: routes.rewards, text: "Rewards", icon: <MailOutlined /> },
];

const AppNavigationBar = () => {
  const selectedKey = useRouter().pathname;

  const [session] = useSession();

  return (
    <Menu selectedKeys={[selectedKey]} mode="horizontal">
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
  );
};

export default AppNavigationBar;
