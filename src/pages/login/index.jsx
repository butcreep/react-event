import React from "react";
import { Link } from "react-router-dom";
import { Input, Button, Checkbox, Radio } from "antd";
import { ReactComponent as Eye } from "assets/images/icons/eye.svg";
import { ReactComponent as Eyeclose } from "assets/images/icons/eyeclose.svg";
import MyButton from "components/MyButton";
import kakao from "assets/images/icons/kakao.svg";
import google from "assets/images/icons/Google.svg";
import naver from "assets/images/icons/naver.svg";
import styled from "styled-components";
const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const LI = styled.li`
  display: inline-block;
  margin-right: 10px;
  &:not(:last-child)::after {
    content: "|";
    margin-left: 10px;
    color: #000;
  }
`;

const Login = ({ admin }) => {
  const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="pt-[120px] flex flex-col justify-between w-full h-full login-main">
      <div className="w-[400px] mx-auto ">
        <h1>{admin ? "TAGA ADMIN" : "TAGA"}</h1>

        <Input placeholder="Basic usage" />
        <Input.Password placeholder="input password" iconRender={visible => (visible ? <Eyeclose /> : <Eye />)} />
        <Button type="primary" block>
          로그인
        </Button>

        <UL className="flex justify-between items-center">
          <LI>
            <Link to="/join">회원가입</Link>
          </LI>
          <LI>
            <Link to="/">아이디 찾기</Link>
          </LI>
          <LI>
            <Link to="/">비밀번호 찾기</Link>
          </LI>
        </UL>
        {!admin && (
          <div>
            <MyButton backgroundImage={kakao} text="카카오 로그인" backgroundColor={"#FEE502"} />
            <MyButton backgroundImage={google} text="구글 로그인" hasBorder={true} />
            <MyButton backgroundImage={naver} text="네이버 로그인" hasBorder={true} />
          </div>
        )}
      </div>
      <Radio.Group className="grid grid-cols-4">
        <Radio.Button value="kakao" onChange={onChange} className="w-16 h-16">
          <img src={kakao} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="nini" onChange={onChange} className="w-16 h-16">
          <img src={google} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="ka" onChange={onChange} className="w-16 h-16">
          <img src={kakao} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="kao" onChange={onChange} className="w-16 h-16">
          <img src={naver} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="kakaoy" onChange={onChange} className="w-16 h-16">
          <img src={kakao} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="niniy" onChange={onChange} className="w-16 h-16">
          <img src={google} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="kay" onChange={onChange} className="w-16 h-16">
          <img src={kakao} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
        <Radio.Button value="kaoy" onChange={onChange} className="w-16 h-16">
          <img src={naver} alt="" />
          <p className="block text-xs">카카오로그인</p>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default Login;
