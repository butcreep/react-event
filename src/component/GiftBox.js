import React, { useState } from "react";

const Giftbox = () => {
  const [display, setDisplay] = useState("none");
  const [couponImg, setCouponImg] = useState("");
  const [couponLink, setCouponLink] = useState("");

  const linkNum = [
    6074695478300000319n,
    6074695525300000320n,
    6074695536100000321n,
    6074695708100000323n,
    6074695708100000323n,
  ];

  const eventAct = num => {
    setCouponImg(`/_images/event/설프로모션/coupon/쿠폰0${num + 1}.png`);
    setCouponLink(`https://tagamall.com/exec/front/newcoupon/IssueDownload?coupon_no=${linkNum[num]}&is_popup=T`);

    setDisplay("block");
  };

  const openPopup = () => {
    setDisplay("block");
  };

  const closePopup = () => {
    setDisplay("none");
  };

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
    const randomNum = Math.floor(Math.random() * 100) + 1;
    eventAct(percentage(randomNum));
  };

  return (
    <div id="giftbox_event_wrap">
      <div className="event_start">Click to start</div>
      <div className="event_area">
        <div className="event_box" onClick={handleClick}>
          Click
        </div>
      </div>
      <div id="event_fade" style={{ display: display }}></div>
      <div className="result_popup" style={{ display: display }}>
        <div className="result_img">
          <img src={couponImg} alt="coupon" />
        </div>
        <a className="c_download" href={couponLink} style={{ display: "block" }}>
          Download Coupon
        </a>
      </div>
    </div>
  );
};

export default Giftbox;
