import React from "react";
import { Form, Input, Button } from "antd";

const Step2Form = ({ onFinish, onPrev }) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Button onClick={onPrev}>Previous</Button>
      <Button type="primary" htmlType="submit">
        Complete
      </Button>
    </Form>
  );
};

export default Step2Form;
