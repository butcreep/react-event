import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
// import eye from "assets/images/icons/eye.svg";
// import eyeclose from "assets/images/icons/eyeclose.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

// 커스텀 아이콘
// const CustomEyeTwoTone = ({ primaryColor, secondaryColor, ...rest }) => {
//   return <img src={eye} alt="" />;
// };
const Login = ({ admin }) => {
  return (
    <div className="max-w-screen-sm mx-auto flex flex-col justify-center items-center h-screen">
      <div className="w-1/2 mx-auto ">
        <h1>{admin ? "TAGA ADMIN" : "TAGA"}</h1>
        {/* 에러났을 떄 처리 */}
        {/* <Input placeholder="Basic usage" status="error" /> */}
        <Input placeholder="Basic usage" />
        <Input.Password
          placeholder="input password"
          // 아이콘 컴포넌트 수정 가능
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          // visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
        <Button type="primary" block>
          로그인
        </Button>

        <ul className="flex justify-between items-center">
          <li>
            <Link to="/">회원가입</Link>
          </li>
          <li>
            <Link to="/">아이디 찾기</Link>
          </li>
          <li>
            <Link to="/">비밀번호 찾기</Link>
          </li>
        </ul>
        {admin || (
          <div>
            <Button type="primary" block>
              카카오 로그인
            </Button>
            <Button type="primary" block>
              네이버 로그인
            </Button>
            <Button type="primary" block>
              구글 로그인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
