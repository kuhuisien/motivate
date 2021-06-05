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

// to be refined
const NavItems: NavigationBarItem[] = [
  { id: "/", text: "Habits", icon: <MailOutlined /> },
  { id: "/dailies", text: "Dailies", icon: <AppstoreOutlined /> },
  { id: "/todos", text: "To Do's", icon: <SettingOutlined /> },
  { id: "/rewards", text: "Rewards", icon: <MailOutlined /> },
];

const AppNavigationBar = () => {
  const selectedKey = useRouter().pathname;

  return (
    <Menu selectedKeys={[selectedKey]} mode="horizontal">
      {NavItems.map((item) => (
        <Menu.Item key={item.id} icon={item.icon}>
          <Link href={item.id}>{item.text}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default AppNavigationBar;
