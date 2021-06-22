import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TextField from "../TextField";
import { Input, Form, Typography } from "antd";
import { TextFieldProps } from "../TextField.types";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/ProviderWrapper";

describe("TextField", () => {
  let wrapper: ReactWrapper;

  let defaultProps: TextFieldProps;

  function renderTextField(args: any) {
    defaultProps = {
      name: "username",
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
  it("should map name prop correctly", () => {
    expect(wrapper.find(Form.Item).props().name).toBe(defaultProps.name);
  });

  it("should map defaultValue prop correctly", () => {
    const defaultValue = 8;
    wrapper = renderTextField({ defaultValue });
    expect(wrapper.find(Form.Item).props().initialValue).toBe(defaultValue);
  });

  it("should map required prop correctly", () => {
    const required = false;
    wrapper = renderTextField({ required });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule) {
      expect(rule.length).toEqual(0);
    } else {
      fail("required rule was found not set correctly");
    }
  });

  it("should map required prop correctly with requiredValMsg prop", () => {
    const required = true;
    const requiredValMsg = "customized validation message";
    wrapper = renderTextField({ required, requiredValMsg });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        message: requiredValMsg,
        required,
        whitespace: true,
      });
    } else {
      fail("required rule was found not set correctly");
    }
  });

  it("should map required prop correctly with transformed name prop when requiredValMsg is undefined", () => {
    const required = true;
    wrapper = renderTextField({ required });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        message: `${defaultProps.name} is required`,
        required,
        whitespace: true,
      });
    } else {
      fail("required rule was found not set correctly");
    }
  });

  it("should map pattern prop correctly", () => {
    // set required to false to test only pattern validation
    const required = false;
    const pattern = "^(?=.*[A-Za-z])(?=.*d).{8,}$";
    wrapper = renderTextField({ required, pattern });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        pattern: new RegExp(pattern),
        message: "Format is wrong",
      });
    } else {
      fail("pattern rule was found not set correctly");
    }
  });

  it("should map pattern prop correctly with patternValMsg", () => {
    // set required to false to test only pattern validation
    const required = false;
    const pattern = "^(?=.*[A-Za-z])(?=.*d).{8,}$";
    const patternValMsg =
      "minimum eight characters, at least one letter and one number";
    wrapper = renderTextField({ required, pattern, patternValMsg });
    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        pattern: new RegExp(pattern),
        message: patternValMsg,
      });
    } else {
      fail("pattern rule was found not set correctly");
    }
  });

  it("should map dependency prop correctly", () => {
    // set required to false to test only pattern validation
    const required = false;
    const dependency = "password";

    wrapper = renderTextField({ required, dependency });
    // const form = wrapper.find(Form).props().form;
    // form?.setFieldsValue({ [dependency]: "123" });
    // wrapper.update();
    expect(wrapper.find(Form.Item).props().rules?.length).toEqual(1);
  });

  it("should map prefix prop correctly", () => {
    const prefix = <div>dummy prefix</div>;
    wrapper = renderTextField({ prefix });
    expect(wrapper.find(Input).props().prefix).toBe(prefix);
  });

  it("should map label prop correctly", () => {
    const label = "dummy label";
    wrapper = renderTextField({ label });
    expect(wrapper.find(Typography.Text).text()).toBe(label);
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

  it("should map email type prop correctly to set email validation rule", () => {
    const type = "email";
    const required = false;
    wrapper = renderTextField({ type, required });
    expect(wrapper.find(Input).props().type).toBe(type);

    const rule = wrapper.find(Form.Item).props().rules;
    if (rule && rule.length > 0) {
      expect(rule[0]).toEqual({
        type,
        message: "The input is not a valid email",
      });
    } else {
      fail("pattern rule was found not set correctly");
    }
  });
});
