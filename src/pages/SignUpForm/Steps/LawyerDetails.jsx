import React from "react";
import { Form, Input, Button } from "antd";

function LawyerDetails({ handleData, nextStep }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    handleData(values);
    nextStep();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Form.Item name="time" label="시험횟수" rules={[{ required: true, message: "Please select your role!" }]}>
        <Input placeholder="시험횟수"></Input>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </Form>
  );
}

export default LawyerDetails;
