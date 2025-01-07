import { Radio, Form } from "antd";
import { RadioButtonProps } from "./RadioButton.types";
import classes from "./RadioButton.module.css";

const RadioButton = ({ name, defaultValue, values }: RadioButtonProps) => {
  return (
    <Form.Item name={name} initialValue={defaultValue}>
      <Radio.Group size="large">
        {values.map((value) => (
          <Radio.Button
            key={value.id}
            value={value.id}
            className={classes.radio}
          >
            {value.body}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioButton;
