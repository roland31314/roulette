import { getData, onChange } from "Store/rouletteStore.js"

function turntable() {
  update(getData())
  onChange(data => { update(data) })
}

function update(roulette) {
  const roulette_data = roulette.data[roulette.index].list
  let canvas = document.querySelector("#turntable canvas");
  let ctx = canvas.getContext("2d");
  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "500");

  let colors = ["#f1aa38", "#dcf138", "#38f14e"];
  let center = [canvas.width / 2, canvas.height / 2];
  let radius = Math.min(canvas.width, canvas.height) / 2;
  let last_position = 0, total = 0, go_to_position = 0;
  let text_pedding = [30, 10];

  for (let i in roulette_data) { total += roulette_data[i].weight }
  for (let i = 0; i < roulette_data.length; i++) {
    const { name, weight } = roulette_data[i]
    //轉盤色塊
    ctx.fillStyle = colors[i % 3];
    ctx.beginPath();
    ctx.moveTo(center[0], center[1]);

    go_to_position = last_position + (Math.PI * 2 * (weight / total));
    ctx.arc(center[0], center[1], radius, last_position, go_to_position, false);
    last_position = go_to_position;

    ctx.lineTo(center[0], center[1]);
    ctx.fill();

    //轉盤文字
    ctx.fillStyle = "#333333";
    ctx.translate(center[0], center[1])
    ctx.rotate(go_to_position - (Math.PI * (weight / total)))
    ctx.translate(radius - text_pedding[0], text_pedding[1])

    ctx.font = "30px Noto Sans CJK TC Regular";
    ctx.textAlign = "end";
    ctx.fillText(name, 0, 0)
    
    ctx.translate(-radius + text_pedding[0], -text_pedding[1]);
    ctx.rotate(-go_to_position + (Math.PI * (weight / total)));
    ctx.translate(-center[0], -center[1]);
  }
}

export default turntable;