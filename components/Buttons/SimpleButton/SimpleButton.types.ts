import { ButtonProps } from "antd";

export interface SimpleButtonProps extends ButtonProps {
  // button text
  children: React.ReactNode;

  withBorder?: boolean;
}
