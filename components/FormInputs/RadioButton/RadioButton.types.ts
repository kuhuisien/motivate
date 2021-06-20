export interface RadioType {
  id: string;
  body: React.ReactNode;
}

export interface RadioButtonProps {
  name: string;
  defaultValue?: string;
  values: RadioType[];
}
