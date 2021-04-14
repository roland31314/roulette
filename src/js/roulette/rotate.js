function rotate() {
  var body = document.querySelector("body");
  var go_btn = document.querySelector("#go-btn");
  var turntable = document.querySelector("#turntable");
  var timeID;
  var rotate_count = 0;
  var ROTATE_STRENGTH = 20;
  
  go_btn.addEventListener("mousedown", StartRotate);
  body.addEventListener("mouseup", stopRotate);

  function StartRotate() {
    turntable.style.transition = "";
    timeID = setInterval(() => {
      rotate_count += ROTATE_STRENGTH
      setRotateDeg(rotate_count)
    }, 16)
  }

  function stopRotate() {
    window.clearInterval(timeID)    
  }

  function setRotateDeg(deg) {
    turntable.style.transform = `rotate(${rotate_count}deg)`;
    console.log(rotate_count)
  }
}

rotate();