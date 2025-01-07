import * as React from "react";
import { Form } from "antd";

interface FormWrapperProps {
  children: React.ReactNode;
}

/**
 * A convenient way to wrap Antd form input components in unit tests that require
 * provider wrappers.
 *
 * Providers included:
 *   1.) Form component in antd
 *
 * Please check out how other unit tests are using these providers.
 *
 * @param {React.ReactNode} children  Any React component
 * @returns Provider wrapper component for convenient unit testing
 */
export const FormProvidersWrapper = ({ children }: FormWrapperProps) => {
  const [form] = Form.useForm();
  return <Form form={form}>{children}</Form>;
};
