import { useMemo } from "react";
import { Form, Input, Typography } from "antd";
import { TextFieldProps } from "./TextField.types";
import { Rule } from "antd/lib/form";
import { camelToSentenceCase } from "lib/str/convertCamelCaseToSentenceCase";

const TextField = ({
  name,
  required = true,
  requiredValMsg,
  pattern,
  patternValMsg,
  dependency,
  prefix,
  label,
  placeholder,
  disabled = false,
  maxLength,
  type = "text",
  defaultValue,
}: TextFieldProps) => {
  // create validation rules
  const rules = useMemo(() => {
    var rules: Rule[] = [];
    var message;
    if (required) {
      if (requiredValMsg != undefined) {
        message = requiredValMsg;
      } else {
        const displayName = camelToSentenceCase(name);
        message = displayName && `${displayName} is required`;
      }
      rules.push({
        required,
        message,
        whitespace: true,
      });
    }
    if (pattern) {
      message = patternValMsg || "Format is wrong";
      rules.push({
        pattern: new RegExp(pattern),
        message,
      });
    }
    if (dependency) {
      const displayName = camelToSentenceCase(dependency as string);
      rules.push(({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue(dependency) === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error(`The two ${displayName}s that you entered do not match`)
          );
        },
      }));
    }
    if (type == "email") {
      rules.push({
        type,
        message: "The input is not a valid email",
      });
    }
    return rules;
  }, [
    required,
    requiredValMsg,
    name,
    pattern,
    patternValMsg,
    dependency,
    type,
  ]);

  return (
    <div>
      {label && <Typography.Text>{label}</Typography.Text>}
      <Form.Item
        name={name}
        rules={rules}
        initialValue={defaultValue}
        dependencies={dependency ? [dependency] : []}
        style={{ width: 313 }}
      >
        <Input
          prefix={prefix}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          type={type}
          size="large"
        />
      </Form.Item>
    </div>
  );
};

export default TextField;
