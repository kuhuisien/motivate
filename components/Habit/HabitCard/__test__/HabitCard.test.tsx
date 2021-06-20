import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Form } from "antd";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/ProviderWrapper";
import Textarea from "../Textarea";
import { TextareaProps } from "../Textarea.types";
import TextArea from "antd/lib/input/TextArea";

describe("TextField", () => {
  let wrapper: ReactWrapper;

  let defaultProps: TextareaProps;

  function renderTextarea(args: any) {
    defaultProps = {
      name: "username",
      rows: 5,
    };
    const props = { ...defaultProps, ...args };
    return mount(
      <FormProvidersWrapper>
        <Textarea {...props} />
      </FormProvidersWrapper>
    );
  }

  beforeEach(() => {
    wrapper = renderTextarea(null);
  });

  it("should render TextArea component", () => {
    expect(wrapper.find(TextArea).length).toBe(1);
  });

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map name prop correctly", () => {
    expect(wrapper.find(Form.Item).props().name).toBe(defaultProps.name);
  });

  it("should map rows prop correctly", () => {
    expect(wrapper.find(TextArea).props().rows).toBe(defaultProps.rows);
  });

  it("should map placeholder prop correctly", () => {
    const placeholder = "dummy placeholder";
    wrapper = renderTextarea({ placeholder });
    expect(wrapper.find(TextArea).props().placeholder).toBe(placeholder);
  });

  it("should map maxLength prop correctly", () => {
    const maxLength = 8;
    wrapper = renderTextarea({ maxLength });
    expect(wrapper.find(TextArea).props().maxLength).toBe(maxLength);
  });
});
