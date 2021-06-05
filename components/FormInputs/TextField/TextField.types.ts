export interface TextFieldProps {
  name?: string;
  required?: boolean;
  validationMessage?: string;
  prefix?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  type?: "text" | "password";

  value: string | null;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}
