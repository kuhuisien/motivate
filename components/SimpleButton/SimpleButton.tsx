import React from "react";
import { SimpleButtonProps } from "./SimpleButton.types";
import { Button } from "antd";

const SimpleButton = ({
  text,
  size,
  icon,
  loading = false,
  type = "primary",
  onClick,
}: SimpleButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      icon={icon}
      loading={loading}
      onClick={() => onClick()}
    >
      {text}
    </Button>
  );
};

export default SimpleButton;
