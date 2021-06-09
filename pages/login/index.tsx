import { useRouter } from "next/router";
import React from "react";
import classes from "styles/Signup.module.css";
import { Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import TextField from "components/FormInputs/TextField/TextField";
import SubmitButton from "components/Buttons/SubmitButton/SubmitButton";
import SimpleButton from "components/Buttons/SimpleButton/SimpleButton";

const Login = () => {
  const router = useRouter();

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
        ></TextField>

        <SubmitButton>LOGIN</SubmitButton>

        <div className={classes.button}>
          <SimpleButton type="text" onClick={() => router.push("/signup")}>
            Create an account
          </SimpleButton>
        </div>
      </Form>
    </div>
  );
};

export default Login;
