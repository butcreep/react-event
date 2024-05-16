// MailForm.js
import React, { useEffect, useState } from "react";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useFetchMails from "components/hooks/useFetchMails";

const MailForm = ({ children }) => {
  const { data, error, loading } = useFetchMails("https://sturdy-maroon-objective.glitch.me/mails");
  const [mails, setMails] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    preparing: 0,
    pending: 0,
    completed: 0,
    refuse: 0,
    important: 0,
    trash: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      const nonTrashData = data.filter(mail => mail.statue !== "휴지통");
      setMails(nonTrashData); // 전체보기에는 휴지통 제외

      const counts = {
        total: nonTrashData.length,
        preparing: data.filter(mail => mail.statue === "preparing").length,
        pending: data.filter(mail => mail.statue === "pending").length,
        completed: data.filter(mail => mail.statue === "completed").length,
        refuse: data.filter(mail => mail.statue === "refuse").length,
        important: data.filter(mail => mail.isImportant).length,
        trash: data.filter(mail => mail.statue === "휴지통").length,
      };
      setCounts(counts);
    }
  }, [data]);

  const handleMenuClick = statusKey => {
    if (statusKey === "All_request") {
      setMails(data); // 전체 데이터를 설정
      navigate(`/board?status=all`); // 쿼리스트링을 사용하여 이동
    } else if (statusKey === "important") {
      const importantMails = data.filter(mail => mail.isImportant);
      setMails(importantMails); // 중요 메일 데이터 설정
      navigate(`/board?status=important`); // 쿼리스트링을 사용하여 이동
    } else if (statusKey === "trash") {
      const trashMails = data.filter(mail => mail.statue === "휴지통");
      setMails(trashMails); // 휴지통 메일 데이터 설정
      navigate(`/board?status=trash`); // 쿼리스트링을 사용하여 이동
    } else {
      const filteredMails = data.filter(mail => mail.statue === statusKey);
      setMails(filteredMails); // 필터링된 메일 데이터 상태 업데이트
      navigate(`/board?status=${statusKey}`); // 쿼리스트링을 사용하여 이동
    }
  };

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
      key: "trash",
      label: (
        <span>
          휴지통 <span style={{ color: "grey" }}>{counts.trash}</span>
        </span>
      ),
      onTitleClick: () => handleMenuClick("trash"),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex w-full">
      <div className="w-[245px] px-4 h-screen border-e-[1px] shrink-0">
        <Button type="primary" block className="my-6">
          <Link to="/mail/quest">의뢰 요청하기</Link>
        </Button>
        <Menu
          onClick={e => handleMenuClick(e.key)}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="w-full border-e-0"
        />
      </div>
      <div className="mt-6 mx-8 w-full">{React.cloneElement(children, { data, setMails })}</div>
    </div>
  );
};

export default MailForm;
