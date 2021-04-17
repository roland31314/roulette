function rotate() {
  let body = document.querySelector("body");
  let go_btn = document.querySelector("#go-btn");
  let turntable = document.querySelector("#turntable");
  let timeID;
  let rotate_count = 5;
  let ROTATE_STRENGTH = 20;
  
  go_btn.addEventListener("mousedown", StartRotate);
  body.addEventListener("mouseup", stopRotate);

  function StartRotate(e) {
    if (timeID !== undefined) return

    turntable.style.transition = ""
    timeID = setInterval(() => {
      rotate_count += ROTATE_STRENGTH
      setRotateDeg(rotate_count)
    }, 16)
  }

  function stopRotate(e) {
    window.clearInterval(timeID)
    timeID = undefined
  }

  function setRotateDeg(deg) {
    turntable.style.transform = `rotate(${rotate_count}deg)`;
  }
}

export default rotate