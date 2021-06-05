import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AppNavigationBar from "../AppNavigationBar";
import { Menu } from "antd";
import Link from "next/link";
import { act } from "react-dom/test-utils";

describe("AppNavigationBar", () => {
  let wrapper: ReactWrapper;

  function renderAppNavigationBar() {
    return mount(<AppNavigationBar />);
  }

  beforeEach(async () => {
    await act(async () => {
      wrapper = renderAppNavigationBar();
    });
  });

  // ====================
  // MENU
  // ====================
  it("should render Menu component with correct default selected key", () => {
    expect(wrapper.find(Menu).length).toBe(1);

    const selectedKeys = wrapper.find(Menu).props().selectedKeys;
    if (selectedKeys) {
      expect(selectedKeys[0]).toEqual("/");
    }
  });

  // ====================
  // MENU ITEM
  // ====================
  it("should render Menu Item component correctly", () => {
    const length = 4;

    expect(wrapper.find(Menu.Item).length).toBe(length);

    for (let i = 0; i < 3; i++) {
      expect(wrapper.find(Menu.Item).at(i).props().icon).not.toBeFalsy();
    }
  });

  it("should render link in Menu Item component correctly", () => {
    const length = 4;

    expect(wrapper.find(Menu.Item).length).toBe(length);

    for (let i = 0; i < 3; i++) {
      const linkComponent = wrapper.find(Menu.Item).at(i).find(Link);
      expect(linkComponent.exists()).toEqual(true);
    }
  });
});
