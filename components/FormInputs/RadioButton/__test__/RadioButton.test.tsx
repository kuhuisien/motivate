import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { RadioButtonProps, RadioType as RadioType } from "../RadioButton.types";
import RadioButton from "../RadioButton";
import Radio from "antd/lib/radio";
import { Form } from "antd";
import { FormProvidersWrapper } from "lib/TestUtil/ProviderWrapper/ProviderWrapper";

describe("SimpleButton", () => {
  let wrapper: ReactWrapper;
  let onClickListener: jest.Mock<any, any>;
  let defaultProps: RadioButtonProps;

  function renderRadioButton(args: any) {
    const dummyRadioButtonSelectionValues: RadioType[] = [
      { id: "1", body: <div>selection 1</div> },
      { id: "2", body: <div>selection 2</div> },
    ];
    defaultProps = {
      name: "dummyName",
      values: dummyRadioButtonSelectionValues,
    };
    const props = { ...defaultProps, ...args };
    return mount(
      <FormProvidersWrapper>
        <RadioButton {...props} />
      </FormProvidersWrapper>
    );
  }

  beforeEach(() => {
    wrapper = renderRadioButton(null);
  });

  it("should render TextArea component", () => {
    expect(wrapper.find(Radio.Group).length).toBe(1);
  });

  // ====================
  // MAPPING PROPS
  // ====================
  it("should map name prop correctly", () => {
    expect(wrapper.find(Form.Item).props().name).toBe(defaultProps.name);
  });

  it("should map values prop correctly to render Radio Button", () => {
    expect(wrapper.find(Radio.Button).length).toBe(defaultProps.values.length);
  });

  it("should map defaultValue prop correctly", () => {
    const defaultValue = "test";
    wrapper = renderRadioButton({ defaultValue });
    expect(wrapper.find(Form.Item).props().initialValue).toBe(defaultValue);
  });
});
