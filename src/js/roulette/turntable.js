import { getData, onChange } from "Store/rouletteStore.js"

const root_el = document.querySelector('#roulette')
const turntable_el = root_el.querySelector("#turntable")

function turntable() {
  update(getData())
  onChange(update)
}

window.onresize = () => {
  update(getData())
}


function update(roulette) {
  const roulette_data = roulette.data[roulette.index].list
  const title_el = document.querySelector("#roulette-title")
  const width = Math.min(root_el.offsetWidth, 500)
  const height = Math.min(root_el.offsetWidth, 500)

  turntable_el.style.width = `${width}px`
  turntable_el.style.height = `${height}px`
  title_el.innerText = roulette.data[roulette.index].title

  const canvas = root_el.querySelector("canvas")
  const ctx = canvas.getContext("2d")
  canvas.setAttribute("width", width)
  canvas.setAttribute("height", height)

  const colors = ["#eeeeee", "#ffa000"]
  const center = [canvas.width / 2, canvas.height / 2]
  const radius = Math.min(canvas.width, canvas.height) / 2
  const scale = width / 500
  const font_size = 30 * scale
  const text_pedding = [30 * scale, 10 * scale]
  let last_position = 0, total = 0, go_to_position = 0

  for (let i in roulette_data) { total += roulette_data[i].weight }
  for (let i = 0; i < roulette_data.length; i++) {
    const { name, weight } = roulette_data[i]
    //轉盤色塊
    ctx.fillStyle = colors[i % 2]
    ctx.beginPath()
    ctx.moveTo(center[0], center[1])

    go_to_position = last_position + (Math.PI * 2 * (weight / total))
    ctx.arc(center[0], center[1], radius, last_position, go_to_position, false)
    last_position = go_to_position

    ctx.lineTo(center[0], center[1])
    ctx.fill()

    //轉盤文字
    ctx.fillStyle = "#333333"
    ctx.translate(center[0], center[1])
    ctx.rotate(go_to_position - (Math.PI * (weight / total)))
    ctx.translate(radius - text_pedding[0], text_pedding[1])

    ctx.font = `${font_size}px Noto Sans CJK TC Regular`
    ctx.textAlign = "end"
    ctx.fillText(name, 0, 0, width/4.5)
    
    ctx.translate(-radius + text_pedding[0], -text_pedding[1])
    ctx.rotate(-go_to_position + (Math.PI * (weight / total)))
    ctx.translate(-center[0], -center[1])
  }
}

export default turntable