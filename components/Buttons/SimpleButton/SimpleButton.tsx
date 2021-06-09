import React from "react";
import { SimpleButtonProps } from "./SimpleButton.types";
import { Button } from "antd";

const SimpleButton = ({
  children,
  htmlType = "button",
  type = "primary",
  size = "middle",
  loading = false,
  disabled = false,
  icon,
  onClick,
}: SimpleButtonProps) => {
  return (
    <Button
      htmlType={htmlType}
      type={type}
      size={size}
      loading={loading}
      disabled={disabled}
      icon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SimpleButton;
