import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Button } from "antd";
import { SimpleButtonProps } from "../SimpleButton.types";
import SimpleButton from "../SimpleButton";

describe("SimpleButton", () => {
  let wrapper: ReactWrapper;
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: SimpleButtonProps;

  function renderSimpleButton(args: any) {
    defaultProps = {
      children: "dummy child",
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
  it("should map children prop correctly", () => {
    expect(wrapper.find(Button).text()).toBe(defaultProps.children);
  });

  it("should map default htmlType prop correctly", () => {
    expect(wrapper.find(Button).props().htmlType).toBe("button");
  });

  it("should map htmlType prop correctly", () => {
    const htmlType = "reset";
    wrapper = renderSimpleButton({ htmlType });
    expect(wrapper.find(Button).props().htmlType).toBe(htmlType);
  });

  it("should map default type prop correctly", () => {
    expect(wrapper.find(Button).props().type).toBe("primary");
  });

  it("should map type prop correctly", () => {
    const type = "text";
    wrapper = renderSimpleButton({ type });
    expect(wrapper.find(Button).props().type).toBe(type);
  });

  it("should map default size prop correctly", () => {
    expect(wrapper.find(Button).props().size).toBe("middle");
  });

  it("should map size prop correctly", () => {
    const size = "small";
    wrapper = renderSimpleButton({ size });
    expect(wrapper.find(Button).props().size).toBe(size);
  });

  it("should map default loading prop correctly", () => {
    expect(wrapper.find(Button).props().loading).toBe(false);
  });

  it("should map loading prop correctly", () => {
    const loading = true;
    wrapper = renderSimpleButton({ loading });
    expect(wrapper.find(Button).props().loading).toBe(loading);
  });

  it("should map default disabled prop correctly", () => {
    expect(wrapper.find(Button).props().disabled).toBe(false);
  });

  it("should map disabled prop correctly", () => {
    const disabled = true;
    wrapper = renderSimpleButton({ disabled });
    expect(wrapper.find(Button).props().disabled).toBe(disabled);
  });

  it("should map default icon prop correctly", () => {
    expect(wrapper.find(Button).props().icon).toBe(undefined);
  });

  it("should map icon prop correctly", () => {
    const icon = <div>icon</div>;
    wrapper = renderSimpleButton({ icon });
    expect(wrapper.find(Button).props().icon).toBe(icon);
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("checks if handleSearchChange method works correctly", () => {
    onClickListener = jest.fn();
    wrapper = renderSimpleButton({ onClick: onClickListener });
    wrapper.find(Button).simulate("click");
    expect(onClickListener).toBeCalled();
  });
});
