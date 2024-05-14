import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const DetailPage = () => {
  const { id } = useParams(); // URL에서 글번호를 가져옵니다
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mails");
        const allData = response.data;
        const selectedDetail = allData.find(item => item.id === id);
        setDetail(selectedDetail);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.patch(`http://localhost:3001/mails/${id}`, {
        statue: "휴지통",
      });
      navigate("/board"); // 목록 페이지로 이동
    } catch (error) {
      console.error("Error moving to trash:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>{detail.title}</h1>
      <p>{detail.content}</p>
      <p>
        <strong>분야:</strong> {detail.category}
      </p>
      <p>
        <strong>상태:</strong> {detail.statue}
      </p>
      <p>
        <strong>의뢰 요청시간:</strong> {moment(detail.sentAt).format("YYYY. MM. DD")}
      </p>
      <button onClick={handleDelete}>글 삭제</button>
    </div>
  );
};

export default DetailPage;
