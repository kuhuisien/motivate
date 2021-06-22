import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AppNavigationBar from "../AppNavigationBar";
import { Menu } from "antd";
import Link from "next/link";
import { act } from "react-dom/test-utils";

// mock individual test case for rendering Menu
jest.mock("next/router", () => ({
  // ensure functionalities of original module are preserved
  ...jest.requireActual<{}>("next/router"),

  // mock hooks within unit test, if not, navigation in unit tests using these hook will throw a TypeError
  useRouter: () => ({
    pathname: "/habit", //module factory of `jest.mock()` is not allowed to reference any out-of-scope variables
  }),
}));

describe("AppNavigationBar test displaying NavigationBar when it is feature page", () => {
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
      expect(selectedKeys[0]).toEqual("/habit");
    }
  });

  // ====================
  // MENU ITEM
  // ====================
  it("should render link in Menu Item component correctly", () => {
    // three feature MenuItem and one Logout button
    const length = 3;

    expect(wrapper.find(Menu.Item).length).toBe(length);

    for (let i = 0; i < length - 1; i++) {
      const linkComponent = wrapper.find(Menu.Item).at(i).find(Link);
      expect(linkComponent.exists()).toEqual(true);
    }
  });
});
