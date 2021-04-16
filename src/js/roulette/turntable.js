function turntable() {
  let canvas = document.querySelector("#turntable canvas");
  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "500");

  let ctx = canvas.getContext("2d");
  let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  let colors = ["#f1aa38", "#dcf138", "#38f14e"];
  let center = [canvas.width / 2, canvas.height / 2];
  let radius = Math.min(canvas.width, canvas.height) / 2;
  let last_position = 0, total = 0, go_to_position = 0;
  let item = [
    "鹽水雞", "健康便當", "滷味", "自助餐",
    "8-1便當", "好佳麵館", "蒜泥白肉", "建宏雞肉飯",
    "燴飯+雙蛋煎", "台南虱目魚", "九月茶餐廳", "鎮源麵攤",
    "黃記魯肉飯", "燒臘便當"
  ];
  let text_pedding = [30, 10];

  for (let i in data) { total += data[i]; }
  for (let i = 0; i < data.length; i++) {
    //轉盤色塊
    ctx.fillStyle = colors[i % 3];
    ctx.beginPath();
    ctx.moveTo(center[0], center[1]);

    go_to_position = last_position + (Math.PI * 2 * (data[i] / total));
    ctx.arc(center[0], center[1], radius, last_position, go_to_position, false);
    last_position = go_to_position;

    ctx.lineTo(center[0], center[1]);
    ctx.fill();


    //轉盤文字
    ctx.fillStyle = "#333333";
    ctx.translate(center[0], center[1])
    ctx.rotate(go_to_position - (Math.PI * (data[i] / total)))
    ctx.translate(radius - text_pedding[0], text_pedding[1])

    ctx.font = "30px Noto Sans CJK TC Regular";
    ctx.textAlign = "end";
    ctx.fillText(item[i], 0, 0)
    
    ctx.translate(-radius + text_pedding[0], -text_pedding[1]);
    ctx.rotate(-go_to_position + (Math.PI * (data[i] / total)));
    ctx.translate(-center[0], -center[1]);
  }
}

export default turntable;