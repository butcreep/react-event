import React, { useRef } from "react";
import { Input, Form, Select, Button, message } from "antd";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useFormik } from "formik";
import axios from "axios";
const QuestPost = () => {
  const editorRef = useRef();

  // Formik hook을 사용하여 폼 상태 관리
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async values => {
      try {
        const response = await axios.post("http://localhost:3001/mails", values);
        console.log("Server Response:", response.data);
        message.success("메일이 성공적으로 전송되었습니다.");
      } catch (error) {
        console.error("Error sending mail:", error);
        message.error("메일 전송에 실패했습니다.");
      }
    },
  });

  const handleSubmit = () => {
    // 에디터에서 마크다운 데이터 가져오기
    const markdown = editorRef.current.getInstance().getMarkdown();
    // Formik의 values 설정
    formik.setFieldValue("content", markdown, false);
    // 폼 제출
    formik.handleSubmit();
  };
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input></Input>
          <Select></Select>
        </Form.Item>

        <Editor
          toolbarItems={[
            // 툴바 옵션 설정
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task", "indent", "outdent"],
            ["table", "image", "link"],
            ["code", "codeblock"],
          ]}
          height="500px" // 에디터 창 높이
          initialEditType="markdown" // 기본 에디터 타입 (or wysiwyg)
          // previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)
          ref={editorRef}
          language="ko-KR"
          initialValue="Hello Toast UI Editor!"
        ></Editor>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestPost;
