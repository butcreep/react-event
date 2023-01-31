import React, { useState, useEffect } from "react";
import rabbit1 from "./images/토끼1.png";
import rabbit2 from "./images/토끼2.png";
import rabbit3 from "./images/토끼3.png";
const setCookie = (key, value, day) => {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + day);
  document.cookie = `${key}=${escape(value)}; path=/; expires=${todayDate.toGMTString()};`;
};

const delCookie = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  document.cookie = `RandomEvent = todayEnd; Expires=${date.toUTCString()}`;
};

const LoginCheck = () => {
  const [visited, setVisited] = useState(false);

  const getCookie = name => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf(name) > -1) {
        setVisited(true);
      }
    }
  };
  getCookie("RandomEvent");
  return visited;
};
function GiftBoxEvent() {
  const [showResultPopup, setShowResultPopup] = useState(false);
  // const [resultImageSrc, setResultImageSrc] = useState("");
  const [display, setDisplay] = useState("none");
  const [couponImg, setCouponImg] = useState("");
  const [couponLink, setCouponLink] = useState("");
  const [boxHovered, setBoxHovered] = useState(false);
  const visited = LoginCheck();
  // const handleEventBoxClick = e => {
  //   setResultImageSrc(e.currentTarget.querySelector("img").src);
  //   setShowResultPopup(true);
  // };

  const handleCloseResultPopup = () => {
    setCookie("RandomEvent", "eventEnd", 8);
    setShowResultPopup(false);
    // setResultImageSrc("");
  };

  const linkNum = [
    6074695478300000319n,
    6074695525300000320n,
    6074695536100000321n,
    6074695708100000323n,
    6074695708100000323n,
  ];

  const eventAct = num => {
    setCouponImg(`/images//coupon/쿠폰0${num + 1}.png`);
    setCouponLink(`https://tagamall.com/exec/front/newcoupon/IssueDownload?coupon_no=${linkNum[num]}&is_popup=T`);

    setDisplay("block");
  };

  const openEvent = () => {
    setDisplay("block");
    document.querySelector(".event_start").style.display = "none";
    document.querySelector(".event_start").style.display = "none";
    document.querySelector("#giftbox_event_wrap .box1").classList.add("box1_move");
    document.querySelector("#giftbox_event_wrap .box2").classList.add("box2_move");
    document.querySelector("#giftbox_event_wrap .box3").classList.add("box3_move");
  };

  // const closePopup = () => {
  //   setDisplay("none");
  // };

  const percentage = percent => {
    if (10000 >= percent && percent > 9999) {
      return 4;
    } else if (9999 >= percent && percent > 6500) {
      return 3;
    } else if (6500 >= percent && percent > 5000) {
      return 2;
    } else if (5000 >= percent && percent > 1500) {
      return 1;
    } else if (1500 >= percent && percent > 0) {
      return 0;
    }
  };

  const handleClick = () => {
    setBoxHovered(true);
    setTimeout(() => {
      event_act(percentage(Math.floor(Math.random() * 10000) + 1));
      setBoxHovered(false);
    }, 1500);
  };

  return (
    <div id="giftbox_event_wrap">
      <div id="event_fade"></div>
      {visited ? (
        <div className="event_end">Event completed</div>
      ) : (
        <>
          <div className="event_start" onClick={openEvent}>
            Open the gift box!
          </div>

          {display === "block" && (
            <div className="event_area gift_flex a_i_center j_c_spaceBetween">
              <button type="button" className={`event_box ${boxHovered ? "box_hover_move" : ""}`} onClick={handleClick}>
                <img src={rabbit1} alt="gift box" />
              </button>
              <button type="button" className={`event_box ${boxHovered ? "box_hover_move" : ""}`} onClick={handleClick}>
                <img src={rabbit2} alt="gift box" />
              </button>
              <button type="button" className={`event_box ${boxHovered ? "box_hover_move" : ""}`} onClick={handleClick}>
                <img src={rabbit3} alt="gift box" />
              </button>
            </div>
          )}
        </>
      )}

      {showResultPopup && (
        <div className="result_popup">
          <div className="result_img">
            <img src={couponImg} alt="result" />
          </div>
          <div className="alert_img">
            <div>
              If you do not download,
              <br />
              the coupon will disappear
            </div>
            <div className="polygon"></div>
          </div>
          <div className="result_btn_wrap">
            <a className="c_download" href={couponLink} style={{ display: "block" }}>
              Download Coupon
            </a>
            <div className="popup_close" onClick={handleCloseResultPopup}>
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiftBoxEvent;
