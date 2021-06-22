export interface SimpleButtonProps {
  // button text
  children: React.ReactNode;

  // original html type of button
  htmlType?: "button" | "submit" | "reset";

  // styling type
  type?: "primary" | "text" | "dashed";

  // size of button, default value is 'middle'
  size?: "small" | "large" | "middle";

  // whether to display loading spinner inside the button
  loading?: boolean;

  // whether button is disabled
  disabled?: boolean;

  // icon to be placed inside the button
  icon?: React.ReactNode;

  // action to trigger when button is clicked
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
