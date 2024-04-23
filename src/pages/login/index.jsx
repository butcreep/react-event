import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { ReactComponent as Eye } from "assets/images/icons/eye.svg";
import { ReactComponent as Eyeclose } from "assets/images/icons/eyeclose.svg";
import MyButton from "components/header/MyButton";
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
      {!admin && (
        <UL className="flex">
          <LI>
            <Link to="/">공지사항</Link>
          </LI>
          <LI>
            <Link to="/">이용약관 및 개인정보 보호 방침</Link>
          </LI>
          <LI>
            <Link to="/">고객문의이메일</Link>
          </LI>
          <LI>
            <Link to="/">주소</Link>
          </LI>
          <LI>
            <Link to="/">통신판매업신고번호</Link>
          </LI>
          <LI>
            <Link to="/">사업자 등록번호</Link>
          </LI>
        </UL>
      )}
    </div>
  );
};

export default Login;
