import React from "react";
import { Form, Input } from "antd";
import { TextareaProps } from "./Textarea.types";

const { TextArea } = Input;

const Textarea = ({ name, rows, placeholder, maxLength }: TextareaProps) => {
  return (
    <Form.Item name={name}>
      <TextArea
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        allowClear
      />
    </Form.Item>
  );
};

export default Textarea;
