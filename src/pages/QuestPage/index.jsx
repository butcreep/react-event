import React from "react";
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
        key: "1",
        label: "신청중",
      },
      {
        key: "2",
        label: "보류중",
      },
      {
        key: "3",
        label: "신청완료",
      },
      {
        key: "4",
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const onClick = e => {
    navigate(`/board/${e.key}`);
  };
  const { type } = useParams();

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
          Content {type}
        </Content>
      </Layout>
    </Layout>
  );
};
export default QuestPage;
