import { FormInstance } from "antd/lib/form";

export interface SubmitButtonProps {
  // button text
  children: React.ReactNode;

  // size of button, default value is 'middle'
  size?: "small" | "large" | "middle" | undefined;

  // whether to display loading spinner inside the button
  loading?: boolean;

  // whether button is disabled
  icon?: React.ReactNode;

  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
