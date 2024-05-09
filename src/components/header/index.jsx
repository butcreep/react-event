import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="flex justify-between items-center border-b-[1px] pb-3">
      <div>
        <p>TAGA</p>
      </div>
      <div className="flex items-center">
        <p>닉네임</p>
        <div>
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default Header;
