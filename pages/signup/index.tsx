import React, { useState, useEffect } from "react";
import classes from "styles/Signup.module.css";
import { Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import { signup } from "api-client/auth/signup";
import { useSession } from "next-auth/client";
import { routes } from "lib/nav/routes";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  // prevent logged in user to access the page
  const [session, loading] = useSession();
  useEffect(() => {
    if (session) {
      router.replace(routes.home);
    }
  }, [session]);

  const [form] = Form.useForm();

  const formFieldNames = {
    email: "email",
    password: "password",
    repeatedPassword: "repeatedPassword",
  };

  // States for the form submission API call
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null
  );

  const onFinish = async (values: any) => {
    try {
      setSubmitErrorMessage(null);
      setSubmitIsLoading(true);

      const email = values[formFieldNames.email];
      const password = values[formFieldNames.password];

      const response = await signup(email, password);
      console.log(response);
    } catch (error) {
      setSubmitErrorMessage(error.message);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className={classes.container}>
      <Form form={form} onFinish={onFinish}>
        <TextField
          prefix={<UserOutlined />}
          placeholder="Email"
          name={formFieldNames.email}
          type="email"
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Password"
          name={formFieldNames.password}
          type="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
          patternValMsg="minimum eight characters, at least one letter and one number"
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Repeated password"
          name={formFieldNames.repeatedPassword}
          requiredValMsg="confirm password"
          type="password"
          dependency={formFieldNames.password}
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
