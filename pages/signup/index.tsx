import React from "react";
import classes from "styles/Signup.module.css";
import { Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";

const Signup = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const onFormValueChange = (changedValues: any, values: any) => {
    //console.log(changedValues);
    //console.log(values);
  };

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish} onValuesChange={onFormValueChange}>
        <TextField
          prefix={<UserOutlined />}
          placeholder="Email"
          name={"email"}
          type="email"
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Password"
          name="password"
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
          patternValMsg="minimum eight characters, at least one letter and one number"
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Repeated password"
          name="repeatedPassword"
          requiredValMsg="confirm password"
          type="password"
          dependency="password"
        ></TextField>

        <SubmitButton>SIGN UP</SubmitButton>
      </Form>
    </div>
  );
};

export default Signup;
