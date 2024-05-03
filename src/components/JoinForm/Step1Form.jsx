import React from "react";
import { Form, Input, Button } from "antd";

const Step1Form = ({ onFinish }) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </Form>
  );
};

export default Step1Form;
