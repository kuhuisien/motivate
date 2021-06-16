export interface Radio {
  id: string;
  body: React.ReactNode;
}

export interface RadioButtonProps {
  name: string;
  defaultValue?: string;
  values: Radio[];
}
