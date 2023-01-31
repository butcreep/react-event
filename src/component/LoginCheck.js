import React, { useEffect } from "react";

const setCookie = (key, value, day) => {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + day);
  document.cookie = `${key}=${escape(value)}; path=/; expires=${todayDate.toGMTString()};`;
};

const delCookie = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  document.cookie = "RandomEvent=todayEnd; Expires=" + date.toUTCString();
};

const LoginCheck = () => {
  useEffect(() => {
    const getCookie = name => {
      const cookies = document.cookie.split(";");
      let visited = false;

      for (const i in cookies) {
        if (cookies[i].indexOf(name) > -1) {
          visited = true;
        }
      }

      if (visited) {
        const eventStart = document.querySelector(".event_start");
        const eventArea = document.querySelector(".event_area");
        const eventEnd = document.querySelector(".event_end");
        if (eventStart) eventStart.style.display = "none";
        if (eventArea) eventArea.style.display = "none";
        if (eventEnd) eventEnd.style.display = "block";
      }
    };

    getCookie("RandomEvent");
  }, []);

  return <div id="event_fade" />;
};

export default LoginCheck;
