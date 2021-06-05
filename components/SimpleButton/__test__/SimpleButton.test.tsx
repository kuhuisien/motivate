import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Input, Form, Button } from "antd";
import { SimpleButtonProps } from "../SimpleButton.types";
import SimpleButton from "../SimpleButton";

describe("SimpleButton", () => {
  let wrapper: ReactWrapper;
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: SimpleButtonProps;

  function renderSimpleButton(args: any) {
    onClickListener = jest.fn();
    defaultProps = {
      text: "dummy text",
      onClick: onClickListener,
    };
    const props = { ...defaultProps, ...args };
    return mount(<SimpleButton {...props} />);
  }

  beforeEach(() => {
    wrapper = renderSimpleButton(null);
  });

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map text prop correctly", () => {
    expect(wrapper.find(Button).text()).toBe(defaultProps.text);
  });

  it("should map default size prop correctly", () => {
    expect(wrapper.find(Button).props().size).toBe(undefined);
  });

  it("should map size prop correctly", () => {
    const size = "small";
    wrapper = renderSimpleButton({ size });
    expect(wrapper.find(Button).props().size).toBe(size);
  });

  it("should map default icon prop correctly", () => {
    expect(wrapper.find(Button).props().icon).toBe(undefined);
  });

  it("should map icon prop correctly", () => {
    const icon = "dummy icon";
    wrapper = renderSimpleButton({ icon });
    expect(wrapper.find(Button).props().icon).toBe(icon);
  });

  it("should map default loading prop correctly", () => {
    expect(wrapper.find(Button).props().loading).toBe(false);
  });

  it("should map loading prop correctly", () => {
    const loading = true;
    wrapper = renderSimpleButton({ loading });
    expect(wrapper.find(Button).props().loading).toBe(loading);
  });

  it("should map default type prop correctly", () => {
    expect(wrapper.find(Button).props().type).toBe("primary");
  });

  it("should map type prop correctly", () => {
    const type = "text";
    wrapper = renderSimpleButton({ type });
    expect(wrapper.find(Button).props().type).toBe(type);
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("checks if handleSearchChange method works correctly", () => {
    wrapper.find(Button).simulate("click");
    expect(onClickListener).toBeCalled();
  });
});
