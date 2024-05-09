import React, { useRef, useState } from "react";
import { Input, Form, Select, Button, Checkbox, Modal } from "antd";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useFormik } from "formik";
import axios from "axios";

import { useMessageApi } from "components/AppLayout";
import { useNavigate } from "react-router-dom";

const QuestPost = () => {
  const editorRef = useRef();
  const navigate = useNavigate();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태
  const messageApi = useMessageApi();

  // Formik hook을 사용하여 폼 상태 관리
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
      time: "",
      statue: "preparing",
    },
    onSubmit: async values => {
      const currentTime = new Date().toISOString(); // ISO 8601 포맷의 문자열로 날짜와 시간을 가져옵니다.
      const dataToSend = {
        ...values,
        statue: values.statue || "preparing",
        sentAt: currentTime, // 데이터 객체에 현재 시간 필드를 추가합니다.
      };
      try {
        // 에디터 내용과 셀렉트박스 값이 포함된 values를 서버로 전송
        const response = await axios.post("http://localhost:3001/mails", dataToSend);
        console.log("Server Response:", response.data);
        messageApi.success("게시글이 등록되었습니다!");
        formik.resetForm();
        navigate("/board");
      } catch (error) {
        console.error("Error sending mail:", error);
        messageApi.error("게시글 등록이 실패했습니다!");
      }
    },
  });
  // 모달을 열기
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 모달에서 '확인'을 누르면
  const handleOk = () => {
    setIsModalVisible(false);
    formik.handleSubmit(); // 폼 제출
  };

  // 모달에서 '취소'를 누르면
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = () => {
    const markdown = editorRef.current.getInstance().getMarkdown();
    formik.setFieldValue("content", markdown, false);
    showModal(); // 제출 전 모달 보여주기
  };

  const handleCheckboxChange = e => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <div className="w-full">
      <Form onFinish={handleSubmit} className="flex">
        <div className="w-1/4">
          <Form.Item>
            <Select
              name="statue"
              placeholder="상태"
              onChange={value => formik.setFieldValue("statue", value)}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "preparing",
                  label: "매칭준비중",
                },
                {
                  value: "pending",
                  label: "매칭보류",
                },
                {
                  value: "completed",
                  label: "매칭완",
                },
                {
                  value: "refuse",
                  label: "매칭거절",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              name="anytime"
              placeholder="뭔가 선택"
              onChange={value => formik.setFieldValue("anytime", value)}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "Yiminghe",
                  label: "yiminghe",
                },
                {
                  value: "disabled",
                  label: "Disabled",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Select
              name="category"
              placeholder="카테고리 선택"
              onChange={value => formik.setFieldValue("category", value)}
            >
              <Select.Option value="news">News</Select.Option>
              <Select.Option value="updates">Updates</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Select name="time" placeholder="작업기한" onChange={value => formik.setFieldValue("time", value)}>
              <Select.Option value="12">12시간</Select.Option>
              <Select.Option value="24">24시간</Select.Option>
            </Select>
          </Form.Item>
          <p>
            [필수 유의 사항] 1) order_item_id가 중복 값이면 안 됩니다. 2) phone_number는 반드시 01X로 시작되어야 합니다.
            (010, 011 등) 3) order_id를 실제 쇼핑몰에 존재하는 주문 번호와 동일하게 입력하는 경우 알림톡이 발송되지
            않습니다. 4) 파일 내 1, 2행은 수정하지 마세요. 삭제하시면 정상적으로 접수되지 않습니다. 위 사항을 고려하지
            않을 경우, 전체 발송이 실패되오니 업로드 전 한 번 더 확인해 주세요.
          </p>
          <Checkbox onChange={handleCheckboxChange}>동의하면체크해</Checkbox>
        </div>

        <div>
          <Form.Item>
            <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
          </Form.Item>
          <Editor
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "link"],
            ]}
            height="500px"
            initialEditType="wysiwyg"
            ref={editorRef}
            hideModeSwitch={true}
            language="ko-KR"
            initialValue="작성해주셍용"
          />
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={!isCheckboxChecked}>
            보내기
          </Button>
        </Form.Item>
      </Form>
      <Modal title="제출 확인" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>진짜로 제출하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default QuestPost;
