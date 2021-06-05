export interface SimpleButtonProps {
  text: string;
  size?: "small" | "large" | "middle" | undefined;
  icon?: React.ReactNode;
  loading?: boolean;
  type?: "primary" | "text";
  onClick: () => void;
}
