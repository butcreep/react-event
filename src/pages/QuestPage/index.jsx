import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button, Menu, Select, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import StatusTag from "components/Tags";

const QuestPage = () => {
  const [mails, setMails] = useState([]);
  const [data, setData] = useState([]);
  const [timeColumn, setTimeColumn] = useState("sentAt");
  const [counts, setCounts] = useState({
    total: 0,
    preparing: 0,
    pending: 0,
    completed: 0,
    refuse: 0,
    important: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("https://397d165c-e839-454e-9f01-613512dbf6e4.mock.pstmn.io/mails");
        const formattedData = response.data.map(item => ({
          ...item,
          key: item.id,
          category: "Text",
          sentAt: moment(item.sentAt).format("YYYY. MM. DD"),
          isImportant: false,
          time: item.time,
        }));
        setData(formattedData);
        setMails(formattedData);

        const counts = {
          total: response.data.length,
          preparing: response.data.filter(mail => mail.statue === "preparing").length,
          pending: response.data.filter(mail => mail.statue === "pending").length,
          completed: response.data.filter(mail => mail.statue === "completed").length,
          refuse: response.data.filter(mail => mail.statue === "refuse").length,
          important: response.data.filter(mail => mail.isImportant).length,
        };
        setCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const items = [
    {
      key: "All_request",
      label: (
        <span>
          전체 의뢰함 <span style={{ color: "red" }}>{counts.total}</span>
        </span>
      ),
      onTitleClick: () => handleMenuClick("All_request"),
      children: [
        {
          key: "preparing",
          label: (
            <span>
              신청중 <span style={{ color: "blue" }}>{counts.preparing}</span>
            </span>
          ),
        },
        {
          key: "pending",
          label: (
            <span>
              보류중 <span style={{ color: "blue" }}>{counts.pending}</span>
            </span>
          ),
        },
        {
          key: "completed",
          label: (
            <span>
              신청완료 <span style={{ color: "blue" }}>{counts.completed}</span>
            </span>
          ),
        },
        {
          key: "refuse",
          label: (
            <span>
              신청거절 <span style={{ color: "blue" }}>{counts.refuse}</span>
            </span>
          ),
        },
      ],
    },
    {
      key: "important",
      label: (
        <span>
          중요 의뢰함 <span style={{ color: "green" }}>{counts.important}</span>
        </span>
      ),
      onTitleClick: () => handleMenuClick("important"),
    },
    {
      key: "sub4",
      label: "종료된 의뢰함",
    },
    {
      type: "divider",
    },
    {
      key: "sub5",
      label: "휴지통",
    },
  ];

  const handleMenuClick = statusKey => {
    if (statusKey === "All_request") {
      setMails(data); // 전체 데이터를 설정
      navigate(`/board?status=all`); // 쿼리스트링을 사용하여 이동
    } else if (statusKey === "important") {
      const importantMails = data.filter(mail => mail.isImportant);
      setMails(importantMails); // 중요 메일 데이터 설정
      navigate(`/board?status=important`); // 쿼리스트링을 사용하여 이동
    } else {
      const filteredMails = data.filter(mail => mail.statue === statusKey);
      setMails(filteredMails); // 필터링된 메일 데이터 상태 업데이트
      navigate(`/board?status=${statusKey}`); // 쿼리스트링을 사용하여 이동
    }
  };

  const onClick = async e => {
    const statusKey = e.key;
    handleMenuClick(statusKey);
  };

  // 토글 중요성 함수
  const toggleImportant = (id, event) => {
    event.stopPropagation();
    const newData = data.map(item => {
      if (item.id === id) {
        item.isImportant = !item.isImportant;
      }
      return item;
    });
    setData(newData);

    // Update the important count
    const importantCount = newData.filter(item => item.isImportant).length;
    setCounts({ ...counts, important: importantCount });
  };
  //patch 사용
  // const toggleImportant = async (id, event) => {
  //   event.stopPropagation();
  //   const newData = data.map(item => {
  //     if (item.id === id) {
  //       item.isImportant = !item.isImportant;
  //     }
  //     return item;
  //   });

  //   // Update the important count
  //   const importantCount = newData.filter(item => item.isImportant).length;
  //   setCounts({ ...counts, important: importantCount });

  //   // Optimistically update the UI
  //   setData(newData);

  //   // Send the update to the server
  //   try {
  //     const updatedItem = newData.find(item => item.id === id);
  //     await axios.patch(`https://397d165c-e839-454e-9f01-613512dbf6e4.mock.pstmn.io/mails/${id}`, {
  //       isImportant: updatedItem.isImportant,
  //     });
  //   } catch (error) {
  //     console.error("Error updating important status:", error);
  //   }
  // };

  const handleTimeFilterChange = value => {
    setTimeColumn(value);
  };

  const columns = [
    {
      key: "important",
      dataIndex: "important",
      width: 48,
      onCell: record => ({
        onClick: e => {
          e.stopPropagation(); // 이벤트 버블링 중지
          toggleImportant(record.id, e); // 중요 표시 토글 함수 호출
        },
      }),
      render: (_, record) => (
        <div
          style={{
            fontSize: "18px",
            color: record.isImportant ? "gold" : "#CDD8E2",
          }}
        >
          {record.isImportant ? <FaStar /> : <FaRegStar />}
        </div>
      ),
    },
    {
      title: "상태",
      width: "10%",
      key: "statue",
      dataIndex: "statue",
      render: statue => <StatusTag status={statue} />,
    },
    { title: "분야", dataIndex: "category", key: "category", width: "10%" },
    { title: "세부 분야", dataIndex: "anytime", key: "anytime" },
    { title: "제목", dataIndex: "title", key: "title", width: "30%" },
    // { title: "의뢰 요청시간", dataIndex: "sentAt", key: "sentAt" },
    {
      title: (
        <Select defaultValue="sentAt" style={{ width: 120 }} onChange={handleTimeFilterChange}>
          <Select.Option value="sentAt">의뢰 요청시간</Select.Option>
          <Select.Option value="time">의뢰 가능시간</Select.Option>
        </Select>
      ),
      dataIndex: timeColumn,
      key: "time",
    },
  ];

  const paginationConfig = {
    pageSize: 10, // Set the number of items per page
    position: ["bottomCenter"],
  };

  return (
    <div className="flex w-full">
      <div className="w-[245px] px-4 h-screen border-e-[1px] shrink-0">
        <Button type="primary" block className="my-6">
          <Link to="/mail/quest">의뢰 요청하기</Link>
        </Button>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="w-full border-e-0"
        />
      </div>

      <div className="mt-6 mx-8 w-full">
        <h2 className=" font-bold text-[20px] pb-3">전체 의뢰함</h2>
        <Table
          dataSource={mails} // mails를 사용하여 필터링된 데이터를 표시
          columns={columns}
          pagination={paginationConfig}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => navigate(`/detail/${record.key}`), // rowIndex 대신 record.key 사용
            };
          }}
        />
      </div>
    </div>
  );
};

export default QuestPage;
