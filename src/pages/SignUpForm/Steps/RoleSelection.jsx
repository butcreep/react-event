import React from "react";
import { Form, Radio, Button } from "antd";

function RoleSelection({ handleData, nextStep }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
    handleData(values);
    nextStep();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Form.Item name="role" label="Select your role" rules={[{ required: true, message: "Please select your role!" }]}>
        <Radio.Group>
          <Radio.Button value="client">Client</Radio.Button>
          <Radio.Button value="lawyer">Lawyer</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </Form>
  );
}

export default RoleSelection;
