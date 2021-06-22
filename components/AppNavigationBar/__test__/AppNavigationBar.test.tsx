import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AppNavigationBar from "../AppNavigationBar";
import { Menu, Button } from "antd";
import Link from "next/link";
import { act } from "react-dom/test-utils";

describe("AppNavigationBar general test", () => {
  /**
   * mock the fetch function that is called internally
   */
  const mockSuccessResponse = { response: "testResponse" };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  var globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  let wrapper: ReactWrapper;
  const MENU_ITEM_COUNT = 3; //two feature MenuItem and one Logout button

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
  it("should render Menu component with correct default selected key when it is home path '/'", () => {
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
    expect(wrapper.find(Menu.Item).length).toBe(MENU_ITEM_COUNT);

    for (let i = 0; i < MENU_ITEM_COUNT - 1; i++) {
      expect(wrapper.find(Menu.Item).at(i).props().icon).not.toBeFalsy();
    }
  });

  it("should render link in Menu Item component correctly", () => {
    expect(wrapper.find(Menu.Item).length).toBe(MENU_ITEM_COUNT);

    for (let i = 0; i < MENU_ITEM_COUNT - 1; i++) {
      const linkComponent = wrapper.find(Menu.Item).at(i).find(Link);
      expect(linkComponent.exists()).toEqual(true);
    }
  });

  it("should have click handler for logout button", () => {
    const onClickHandler = wrapper.find(Button).props().onClick;

    if (onClickHandler) {
      onClickHandler({} as any);
    } else {
      fail("onClick prop set on the button was found to be undefined");
    }
  });
});
