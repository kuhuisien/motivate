import React, { useState } from "react";
import classes from "styles/Signup.module.css";
import { Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import { signup } from "api-client/auth/signup";

const Signup = () => {
  const [form] = Form.useForm();

  // States for the form submission API call
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null
  );

  const onFinish = async (values: any) => {
    try {
      setSubmitErrorMessage(null);
      setSubmitIsLoading(true);
      console.log("Received values of form: ", values);
      const { email, password } = values;
      const response = await signup(email, password);
      console.log(response);
    } catch (error) {
      setSubmitErrorMessage(error.message);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish}>
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

        <SubmitButton loading={submitIsLoading}>SIGN UP</SubmitButton>

        {submitErrorMessage && (
          <Typography.Text type="danger">{submitErrorMessage}</Typography.Text>
        )}
      </Form>
    </div>
  );
};

export default Signup;
