import React from "react";
import { Form, Input } from "antd";
import { TextFieldProps } from "./TextField.types";

const TextField = ({
  name,
  required,
  validationMessage,
  prefix,
  placeholder,
  disabled = false,
  maxLength,
  type = "text",
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: validationMessage,
        },
      ]}
    >
      <Input
        style={{ width: 300 }}
        prefix={prefix}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        type={type}
        value={value || undefined}
        size="large"
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default TextField;
