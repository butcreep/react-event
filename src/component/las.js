import React, { useState } from "react";

const GiftboxEvent = () => {
  const [boxHovered, setBoxHovered] = useState(false);
  const visited = LoginCheck();

  const handleBoxClick = () => {
    setBoxHovered(true);
    setTimeout(() => {
      event_act(percentage(Math.floor(Math.random() * 10000) + 1));
      setBoxHovered(false);
    }, 1500);
  };

  const handlePopupClose = () => {
    setCookie("RandomEvent", "eventEnd", 8);
    closePopup();
  };

  return (
    <div id="giftbox_event_wrap">
      <div className={`event_box ${boxHovered ? "box_hover_move" : ""}`} onClick={handleBoxClick} disabled={visited}>
        {/* ... */}
      </div>
      {visited ? (
        <div className="event_end">{/* ... */}</div>
      ) : (
        <>
          <div className="event_start">{/* ... */}</div>
          <div className="event_area">{/* ... */}</div>
        </>
      )}
      <div className="result_popup">
        {/* ... */}
        <button className="popup_close" onClick={handlePopupClose}>
          {/* ... */}
        </button>
        <button className="c_download" onClick={handlePopupClose}>
          {/* ... */}
        </button>
      </div>
    </div>
  );
};

export default GiftboxEvent;
