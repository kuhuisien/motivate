import { NamePath } from "antd/lib/form/interface";

export interface TextFieldProps {
  // name of the state, used specifically by antd for data binding
  name: string;

  // whether the field is required, default value is 'true'
  required?: boolean;

  // customized validation message to be displayed when the field is required and value is falsy
  // if not provided, display as : ${displayName} is required
  // where ${displayName} is the sentense case of name prop
  // e.g. name prop = 'dayOfAttendance', so displayName = 'day of attendance'
  // and validation message is displayed as 'day of attendance is required'
  requiredValMsg?: string;

  // regex string for pattern validation
  pattern?: string;

  // customized validation message to be displaed when the field does not match regex of pattern prop
  // if not provided, display as : 'Format is wrong'
  patternValMsg?: string;

  // name of the state in which this textfield should refer to
  // when provided, the textfield
  //    1) checks if value is equal to the dependency state value,
  //    2) if not equal, display validation message: The two ${displayName}s that you entered do not match`
  //          where ${displayName} is the sentense case of name prop
  //              (refer to requiredValMsg's displayName definition)
  dependency?: NamePath;

  // prefix to be displayed in the textfield
  prefix?: React.ReactNode;

  // label to be displayed on top of the textfield
  label?: string;

  // placeholder of the textfield
  placeholder?: string;

  // whether textfield is disabled
  disabled?: boolean;

  // maximum number of charaters allowed to be entered
  maxLength?: number;

  // type of textfield, default value is 'text'
  type?: "text" | "password" | "email";

  defaultValue?: string | null;
}
