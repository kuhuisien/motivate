import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TextField from "../TextField";
import { Input, Form } from "antd";
import { TextFieldProps } from "../TextField.types";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/ProviderWrapper";

describe("TextField", () => {
  let wrapper: ReactWrapper;
  let onChangeListener: jest.Mock<any, any>;
  let defaultProps: TextFieldProps;

  function renderTextField(args: any) {
    onChangeListener = jest.fn();
    defaultProps = {
      value: "dummy value",
      onChange: onChangeListener,
    };
    const props = { ...defaultProps, ...args };
    return mount(
      <FormProvidersWrapper>
        <TextField {...props} />
      </FormProvidersWrapper>
    );
  }

  beforeEach(() => {
    wrapper = renderTextField(null);
  });

  it("should render Input component", () => {
    expect(wrapper.find(Input).length).toBe(1);
  });

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map value prop correctly", () => {
    expect(wrapper.find(Input).props().value).toBe(defaultProps.value);
  });

  it("should map value prop correctly when value = null", () => {
    wrapper = renderTextField({ value: null });
    expect(wrapper.find(Input).props().value).toBe(undefined);
  });

  it("should map name prop correctly", () => {
    const name = "username";
    wrapper = renderTextField({ name });
    expect(wrapper.find(Form.Item).props().name).toBe(name);
  });

  it("should map required prop correctly", () => {
    const required = true;
    wrapper = renderTextField({ required });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({ message: undefined, required });
    } else {
      fail("required prop was found not mapped");
    }
  });

  it("should map validationMessage prop correctly", () => {
    const validationMessage = "dummy validation message";
    wrapper = renderTextField({ validationMessage });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        message: validationMessage,
        required: undefined,
      });
    } else {
      fail("validationMessage prop was found not mapped");
    }
  });

  it("should map prefix prop correctly", () => {
    const prefix = <div>dummy prefix</div>;
    wrapper = renderTextField({ prefix });
    expect(wrapper.find(Input).props().prefix).toBe(prefix);
  });

  it("should map placeholder prop correctly", () => {
    const placeholder = "dummy placeholder";
    wrapper = renderTextField({ placeholder });
    expect(wrapper.find(Input).props().placeholder).toBe(placeholder);
  });

  it("should map default disabled prop correctly", () => {
    expect(wrapper.find(Input).props().disabled).toBe(false);
  });

  it("should map disabled prop correctly", () => {
    const disabled = true;
    wrapper = renderTextField({ disabled });
    expect(wrapper.find(Input).props().disabled).toBe(disabled);
  });

  it("should map maxLength prop correctly", () => {
    const maxLength = 8;
    wrapper = renderTextField({ maxLength });
    expect(wrapper.find(Input).props().maxLength).toBe(maxLength);
  });

  it("should map default type prop correctly", () => {
    expect(wrapper.find(Input).props().type).toBe("text");
  });

  it("should map type prop correctly", () => {
    const type = "password";
    wrapper = renderTextField({ type });
    expect(wrapper.find(Input).props().type).toBe(type);
  });

  // ====================
  // EVENT HANDLER
  // ====================
  it("checks if handleSearchChange method works correctly", () => {
    wrapper.find(Input).simulate("change", { target: { value: "hello" } });
    expect(onChangeListener).toBeCalled();
  });
});
