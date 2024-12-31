import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import classes from "styles/Login.module.css";
import { Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";
import { signIn, useSession } from "next-auth/react";
import { PATHS } from "lib/nav/routes";

const Login = () => {
  const router = useRouter();

  // prevent logged in user to access the page
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      router.replace(PATHS.HOME.path);
    }
  }, [session]);

  const [form] = Form.useForm();

  const formFieldNames = {
    email: "email",
    password: "password",
  };

  // States for the form submission API call
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null
  );

  const onFinish = async (values: any) => {
    try {
      setSubmitIsLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: values[formFieldNames.email],
        password: values[formFieldNames.password],
      });
      if (result?.error) {
        setSubmitErrorMessage(result.error);
      } else {
        router.replace(PATHS.HOME.path);
      }
    } catch (error) {
      console.error(error);
      setSubmitErrorMessage(error as string);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const googleSignIn = async () => {
    await signIn("google");
  };

  if (status === "loading") return null;

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
        ></TextField>

        <SubmitButton loading={submitIsLoading}>LOGIN</SubmitButton>

        <SimpleButton onClick={googleSignIn}>Sign in with Google</SimpleButton>

        {submitErrorMessage && (
          <Typography.Text type="danger" className={classes.errorMessage}>
            {submitErrorMessage}
          </Typography.Text>
        )}

        <div className={classes.button}>
          <SimpleButton
            type="text"
            onClick={() => router.push(PATHS.SIGNUP.path)}
          >
            Create an account
          </SimpleButton>
        </div>
      </Form>
    </div>
  );
};

export default Login;
