import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Button } from "antd";
import { SubmitButtonProps } from "../SubmitButton.types";
import SubmitButton from "../SubmitButton";
import Form, { FormInstance } from "antd/lib/form";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/ProviderWrapper";

describe("SubmitButton", () => {
  let wrapper: ReactWrapper;
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: SubmitButtonProps;

  function renderSubmitButton(args: any) {
    const formRef = React.createRef<FormInstance>();
    defaultProps = {
      children: "dummy child",
    };
    const props = { ...defaultProps, ...args };
    return mount(
      <FormProvidersWrapper>
        <SubmitButton {...props} />
      </FormProvidersWrapper>
    );
  }

  beforeEach(() => {
    wrapper = renderSubmitButton(null);
  });

  // ====================
  // FORM ITEM
  // ====================
  it("should render Form.Item correctly", () => {
    expect(wrapper.find(Form.Item).props().shouldUpdate).toBe(true);
  });

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map children prop correctly", () => {
    expect(wrapper.find(Button).text()).toBe(defaultProps.children);
  });

  it("should map htmlType prop correctly", () => {
    expect(wrapper.find(Button).props().htmlType).toBe("submit");
  });

  it("should map default size prop correctly", () => {
    expect(wrapper.find(Button).props().size).toBe("middle");
  });

  it("should map size prop correctly", () => {
    const size = "small";
    wrapper = renderSubmitButton({ size });
    expect(wrapper.find(Button).props().size).toBe(size);
  });

  it("should map default loading prop correctly", () => {
    expect(wrapper.find(Button).props().loading).toBe(false);
  });

  it("should map loading prop correctly", () => {
    const loading = true;
    wrapper = renderSubmitButton({ loading });
    expect(wrapper.find(Button).props().loading).toBe(loading);
  });

  it("should map default icon prop correctly", () => {
    expect(wrapper.find(Button).props().icon).toBe(undefined);
  });

  it("should map icon prop correctly", () => {
    const icon = <div>icon</div>;
    wrapper = renderSubmitButton({ icon });
    expect(wrapper.find(Button).props().icon).toBe(icon);
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("checks if handleSearchChange method works correctly", () => {
    onClickListener = jest.fn();
    wrapper = renderSubmitButton({ onClick: onClickListener });
    wrapper.find(Button).simulate("click");
    expect(onClickListener).toBeCalled();
  });
});
