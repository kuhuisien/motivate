import React from "react";
import { Form } from "antd";
import { SubmitButtonProps } from "./SubmitButton.types";
import SimpleButton from "../SimpleButton/SimpleButton";

/**
 *
 * Submit button which is rerendered when any Form update occurs
 * This is to control the disabling behaviour of the button
 */
const SubmitButton = ({ children, ...restProps }: SubmitButtonProps) => {
  return (
    <Form.Item>
      <SimpleButton htmlType="submit" {...restProps}>
        {children}
      </SimpleButton>
    </Form.Item>
  );
};

export default SubmitButton;
