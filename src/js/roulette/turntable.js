function turntable() {
  var canvas = document.querySelector("#turntable canvas");
  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "500");

  var ctx = canvas.getContext("2d");
  var data = [1, 2, 3, 1.5, 1, 1];
  var colors = ["#7E3817", "#C35817", "#EE9A4D", "#A0C544", "#348017", "#307D7E"];
  var center = [canvas.width / 2, canvas.height / 2];
  var radius = Math.min(canvas.width, canvas.height) / 2;
  var last_position = 0, total = 0, go_to_position = 0;
  var item = ["鹽水雞", "健康便當", "8-1便當", "好佳麵館", "池上便當", "蒜泥白肉"];
  var text_pedding = [30, 10];

  for (var i in data) { total += data[i]; }
  for (var i = 0; i < data.length; i++) {
    //轉盤色塊
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(center[0], center[1]);

    go_to_position = last_position + (Math.PI * 2 * (data[i] / total));
    ctx.arc(center[0], center[1], radius, last_position, go_to_position, false);
    last_position = go_to_position;

    ctx.lineTo(center[0], center[1]);
    ctx.fill();


    //轉盤文字
    ctx.fillStyle = "#FFFFFF";
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

turntable();