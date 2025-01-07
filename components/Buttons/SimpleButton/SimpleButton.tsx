import { SimpleButtonProps } from "./SimpleButton.types";
import { Button } from "antd";
import classes from "./SimpleButton.module.css";

const SimpleButton = ({
  children,
  type = "primary",
  withBorder = true,
  ...restProps
}: SimpleButtonProps) => {
  return (
    <Button
      className={withBorder ? "" : classes.withoutBorder}
      type={type}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default SimpleButton;
