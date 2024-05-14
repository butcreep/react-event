import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const DetailPage = () => {
  const { id } = useParams(); // URL에서 글번호를 가져옵니다
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://397d165c-e839-454e-9f01-613512dbf6e4.mock.pstmn.io/mails");
        const allData = response.data;
        console.log(allData);
        const selectedDetail = allData.find(item => item.id === id);
        console.log(selectedDetail);
        setDetail(selectedDetail);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    </div>
  );
};

export default DetailPage;
