import React from "react";
import { Radio, Form } from "antd";
import { RadioButtonProps } from "./RadioButton.types";

const RadioButton = ({ name, defaultValue, values }: RadioButtonProps) => {
  return (
    <Form.Item name={name} initialValue={defaultValue}>
      <Radio.Group size="large">
        {values.map((value) => (
          <Radio.Button key={value.id} value={value.id}>
            {value.body}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioButton;
