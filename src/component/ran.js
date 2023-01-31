// 쿠키 생성
function setCookie(key, value, day) {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + day);
  document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

// 쿠키 삭제
function delCookie() {
  var date = new Date();

  date.setDate(date.getDate() - 1);

  var setCookie = "";
  setCookie += "RandomEvent = todayEnd;";
  setCookie += "Expires=" + date.toUTCString();

  document.cookie = setCookie;
}

// 이전 쿠키 체크
function getCookie(name) {
  var cookies = document.cookie.split(";");
  var visited = false;

  for (var i in cookies) {
    if (cookies[i].indexOf(name) > -1) {
      visited = true;
    }
  }

  if (visited) {
    //방문기록이 있다면 이벤트 참여 버튼을 없앤다
    document.querySelector(".event_start").style.display = "none";
    document.querySelector(".event_area").style.display = "none";
    document.querySelector(".event_end").style.display = "block";
  }
}
getCookie("RandomEvent");

$(document).ready(function () {
  // event start 상자 클릭 => 상자 애니메이션 add
  $(".event_start").click(function () {
    $(this).fadeOut(300);

    $("#giftbox_event_wrap .event_area").css({
      display: "flex",
    });

    $("#giftbox_event_wrap .box1").addClass("box1_move");
    $("#giftbox_event_wrap .box2").addClass("box2_move");
    $("#giftbox_event_wrap .box3").addClass("box3_move");
  });

  // 뒤에 n은 숫자가 너무 커서 bigint 숫자 리터럴로 변환하기 위해 붙은 것
  // 쿠폰번호
  var link_num = new Array(
    6074695478300000319n,
    6074695525300000320n,
    6074695536100000321n,
    6074695708100000323n,
    6074695708100000323n,
  );

  // 선물 상자 클릭 후
  function event_act(num) {
    // 쿠폰 이미지
    var coupon_img = "/_images/event/설프로모션/coupon/쿠폰0" + (num + 1) + ".png";
    $(".result_popup .result_img img").attr("src", coupon_img);

    // 쿠폰 링크
    var coupon_link =
      "https://tagamall.com/exec/front/newcoupon/IssueDownload?coupon_no=" + link_num[num] + "&is_popup=T";
    $(".result_popup .c_download").attr("href", coupon_link);

    $(".result_popup .c_download").css({
      display: "block",
    });

    openPopup("result_popup");
  }

  // 팝업창 열기
  function openPopup(fade_popup) {
    closePopup();

    $("#event_fade")
      .css({
        filter: "alpha(opacity=60)",
      })
      .fadeIn(200);

    $("." + fade_popup)
      .addClass("popup_move")
      .fadeIn(200);
  }
  // 팝업창 닫기
  function closePopup() {
    $("#event_fade").fadeOut(300);
    $(".result_popup").fadeOut(300);
    $("#giftbox_event_wrap .event_area").fadeOut(300);
    $(".event_end").fadeIn(300);
  }

  // 확률 조정

  function percentage(percent) {
    if (10000 >= percent && percent > 9999) {
      // 전제품 증정
      return 4;
    } else if (9999 >= percent && percent > 6700) {
      // 트래블 키트 증정
      return 3;
    } else if (6700 >= percent && percent > 5000) {
      // 3000원 할인쿠폰
      return 2;
    } else if (5000 >= percent && percent > 1500) {
      // 1000원 할인쿠폰
      return 1;
    } else if (1500 >= percent && percent > 0) {
      // 무료배송 쿠폰
      return 0;
    }
  }

  // 선물 상자 클릭 => 1~100 중 랜덤으로 번호 추출 후 확률 함수의 매개변수로 => 확률에 따라 return 된 값이 event_act 매개변수로
  $("#giftbox_event_wrap .event_box").click(function () {
    $(this).addClass("box_hover_move");

    setTimeout(function () {
      // 1부터 100까지 정수 출력
      // percentage(Math.floor(Math.random() * 100) + 1);
      event_act(percentage(Math.floor(Math.random() * 10000) + 1));

      $("#giftbox_event_wrap .event_box").removeClass("box_hover_move");
    }, 1500);
    // $(this).find("img").attr("src", "/_images/event/설프로모션/설프로모션_open.png");
  });

  // 결과 팝업창 닫기 버튼이나 쿠폰 다운받기 버튼을 누를 시 => 박스들의 클릭 활동을 제한하고 쿠키 부여
  $(".result_popup .popup_close, .result_popup .c_download").click(function () {
    setCookie("RandomEvent", "eventEnd", 8);
    $(".event_box").attr("disabled", true);
    // $(".box1").attr("disabled", true);
    // $(".box2").attr("disabled", true);
    // $(".box3").attr("disabled", true);
    closePopup();
  });
});
