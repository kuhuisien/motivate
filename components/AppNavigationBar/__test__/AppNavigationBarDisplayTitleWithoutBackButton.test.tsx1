import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AppNavigationBar from "../AppNavigationBar";
import { Menu, Button } from "antd";
import Link from "next/link";
import { act } from "react-dom/test-utils";

// mock individual test case for rendering Menu
jest.mock("next/router", () => ({
  // ensure functionalities of original module are preserved
  ...jest.requireActual<{}>("next/router"),

  // mock hooks within unit test, if not, navigation in unit tests using these hook will throw a TypeError
  useRouter: () => ({
    pathname: "/auth/signup", //module factory of `jest.mock()` is not allowed to reference any out-of-scope variables
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
  it("should not render Menu component when it is not faeture page or home page", () => {
    expect(wrapper.find(Menu).length).toBe(0);
  });

  it("should not render back button when it is configured not to do so", () => {
    expect(wrapper.find(Button).length).toBe(0);
  });
});
