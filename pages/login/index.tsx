import React, { useState } from "react";
import styles from "styles/Login.module.css";
import { LoginFormFieldState } from "lib/types/pages/login.types";
import classes from "styles/Login.module.css";
import nameof from "ts-nameof.macro";
import { useRouter } from "next/router";
import { Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SimpleButton from "components/SimpleButton/SimpleButton";

const Login = () => {
  const router = useRouter();

  const [loginFormField, setLoginFormField] = useState<LoginFormFieldState>({
    email: null,
    password: null,
  });

  const handleLoginChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const updatedLoginFormField = { ...loginFormField, [name]: value };
    setLoginFormField(updatedLoginFormField);
  };

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <TextField
          prefix={<UserOutlined />}
          placeholder="Email"
          name={nameof(loginFormField.email)}
          value={loginFormField.email}
          onChange={handleLoginChange}
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Password"
          name={nameof(loginFormField.email)}
          value={loginFormField.password}
          type="password"
          onChange={handleLoginChange}
        ></TextField>

        <SimpleButton text="LOGIN" onClick={() => {}}></SimpleButton>

        <div className={classes.button}>
          <SimpleButton
            type="text"
            text="Create an account"
            onClick={() => router.push("/signup")}
          ></SimpleButton>
        </div>
      </Space>
    </div>
  );
};

export default Login;
