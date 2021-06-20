import React from "react";
import { Form } from "antd";
import { SubmitButtonProps } from "./SubmitButton.types";
import SimpleButton from "../SimpleButton/SimpleButton";
import classes from "./SubmitButton.module.css";

/**
 *
 * Submit button which is rerendered when any Form update occurs
 * This is to control the disabling behaviour of the button
 */
const SubmitButton = ({
  children,
  size,
  loading = false,
  icon,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Form.Item shouldUpdate className={classes.button}>
      {(form) => (
        <SimpleButton
          htmlType="submit"
          size={size}
          loading={loading}
          disabled={
            !form.isFieldsTouched(true) ||
            form.getFieldsError().filter(({ errors }) => errors.length).length >
              0
          }
          icon={icon}
          onClick={onClick}
        >
          {children}
        </SimpleButton>
      )}
    </Form.Item>
  );
};

export default SubmitButton;
