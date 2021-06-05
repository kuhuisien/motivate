import React, { useState } from "react";
import styles from "styles/Signup.module.css";
import { SignupFormFieldState } from "lib/types/pages/signup.types";
import nameof from "ts-nameof.macro";
import { Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SimpleButton from "components/SimpleButton/SimpleButton";

const Signup = () => {
  const [signupFormField, setSignupFormField] = useState<SignupFormFieldState>({
    email: null,
    password: null,
    repeatedPassword: null,
  });

  const handleSignupChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    const updatedSignupFormField = { ...signupFormField, [name]: value };
    setSignupFormField(updatedSignupFormField);
  };

  return (
    <div className={styles.container}>
      <Space direction="vertical">
        <TextField
          prefix={<UserOutlined />}
          placeholder="Email"
          name={nameof(signupFormField.email)}
          value={signupFormField.email}
          onChange={handleSignupChange}
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Password"
          name={nameof(signupFormField.email)}
          value={signupFormField.password}
          type="password"
          onChange={handleSignupChange}
        ></TextField>

        <TextField
          prefix={<LockOutlined />}
          placeholder="Repeat password"
          name={nameof(signupFormField.email)}
          value={signupFormField.repeatedPassword}
          type="password"
          onChange={handleSignupChange}
        ></TextField>

        <SimpleButton text="SIGN UP" onClick={() => {}}></SimpleButton>
      </Space>
    </div>
  );
};

export default Signup;
