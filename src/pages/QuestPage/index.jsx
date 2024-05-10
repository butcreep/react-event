import React, { useState } from "react";
import axios from "axios";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Content, Sider } = Layout;

const items = [
  {
    key: "All_request",
    label: "전체 의뢰함",
    icon: <MailOutlined />,
    children: [
      {
        key: "preparing",
        label: "신청중",
      },
      {
        key: "pending",
        label: "보류중",
      },
      {
        key: "completed",
        label: "신청완료",
      },
      {
        key: "refuse",
        label: "신청거절",
      },
    ],
  },
  {
    key: "sub2",
    label: "중요 의뢰함",
    icon: <AppstoreOutlined />,
  },
  {
    key: "sub4",
    label: "종료된 의뢰함",
    icon: <SettingOutlined />,
  },

  {
    type: "divider",
  },
  {
    key: "sub5",
    label: "휴지통",
    icon: <SettingOutlined />,
  },
];
const QuestPage = () => {
  const [mails, setMails] = useState([]); // 메일 데이터를 저장할 상태
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onClick = async e => {
    const statusKey = e.key;
    const response = await axios.get("http://localhost:3001/mails");
    console.log(response);
    const filteredMails = response.data.filter(mail => mail.statue === statusKey);
    setMails(filteredMails); // 필터링된 메일 데이터 상태 업데이트
    navigate(`/board/${statusKey}`); // 필터링된 데이터와 함께 해당 경로로 이동
  };
  // const { type } = useParams();

  return (
    <Layout>
      <Sider
        style={{
          background: colorBgContainer,
        }}
      >
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 50,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {mails.map(mail => (
            <div key={mail.id}>
              <h3>{mail.title}</h3>
              <p>{mail.content}</p>
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default QuestPage;
