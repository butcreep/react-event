// import React, { useState } from "react";
// import { Upload, Button, message, Form, Input } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import axios from "axios";

// function QuestPost() {
//   const [fileList, setFileList] = useState([]);

//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const onPreview = async file => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise(resolve => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow.document.write(image.outerHTML);
//   };

//   const onFinish = async values => {
//     // Assume the server expects 'title', 'description', and 'imageUrl' keys
//     const postData = {
//       title: values.title,
//       description: values.description,
//       imageUrl: fileList.length > 0 ? fileList[0].thumbUrl : null,
//     };
//     try {
//       const response = await axios.post("http://localhost:3001/mails", postData);
//       message.success("Post submitted successfully!");
//       console.log(response.data); // 응답 로그 출력
//       setFileList([]); // Clear the uploaded file list after submitting
//     } catch (error) {
//       message.error("Failed to submit post");
//       console.error(error);
//     }
//   };

//   const uploadButton = <Button icon={<UploadOutlined />}>Upload</Button>;

//   return (
//     <Form onFinish={onFinish} layout="vertical" style={{ width: 400, margin: "100px auto" }}>
//       <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input a title!" }]}>
//         <Input placeholder="Enter the title of the post" />
//       </Form.Item>
//       <Form.Item name="description" label="Description">
//         <Input.TextArea rows={4} placeholder="Enter a description" />
//       </Form.Item>
//       <Form.Item label="Upload Image">
//         <Upload
//           listType="picture-card"
//           fileList={fileList}
//           onChange={onChange}
//           onPreview={onPreview}
//           beforeUpload={() => false} // Do not automatically upload
//         >
//           {fileList.length < 1 && uploadButton}
//         </Upload>
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit Post
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }

// export default QuestPost;import React, { useState } from "react";

import React, { useState } from "react";
import { Upload, Button, message, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function QuestPost() {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const uploadButton = <Button icon={<UploadOutlined />}>Upload</Button>;
  const customRequest = ({ file, onProgress, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3001/mails", formData, {
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: Math.round((loaded / total) * 100) });
        },
      })
      .then(response => {
        onSuccess(response.data);
        setFileList([]); // Clear the uploaded file list after submitting
        message.success("File uploaded successfully!");
      })
      .catch(error => {
        onError(error);
        message.error("Failed to upload file");
      });
  };

  const onFinish = async values => {
    // Assume the server expects 'title', 'description', and 'imageUrl' keys
    const postData = {
      title: values.title,
      description: values.description,
      imageUrl: fileList.length > 0 ? fileList[0].thumbUrl : null,
    };
    try {
      const response = await axios.post("http://localhost:3001/mails", postData);
      message.success("Post submitted successfully!");
      console.log(response.data); // 응답 로그 출력
      setFileList([]); // Clear the uploaded file list after submitting
    } catch (error) {
      message.error("Failed to submit post");
      console.error(error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical" style={{ width: 400, margin: "100px auto" }}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input a title!" }]}>
        <Input placeholder="Enter the title of the post" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter a description" />
      </Form.Item>
      <Form.Item label="Upload Image">
        <Upload
          listType="picture-card"
          fileList={fileList}
          customRequest={customRequest}
          onPreview={onPreview}
          onChange={onChange}
          beforeUpload={() => false} // Do not automatically upload
        >
          {fileList.length < 1 && uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Post
        </Button>
      </Form.Item>
    </Form>
  );
}

export default QuestPost;
