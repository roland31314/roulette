import { setData, getData, onChange } from "Store/rouletteStore.js"

const input_el = document.querySelector("#input-roulette-data")
const outpute_el = document.querySelector("#outpute-roulette-data")
const outpute_btn = document.querySelector("#outpute-roulette-data-btn")

export default function inputOutpute() {
  updataOutpute(getData())
  onChange(updataOutpute)

  outpute_btn.onclick = outputeOnClick
  input_el.onchange = inputOnChange
}

function updataOutpute(data) {
  outpute_el.value = JSON.stringify(data)
}

function outputeOnClick() {
  const text_range = document.createRange()
  text_range.selectNode(outpute_el)

  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(text_range)
  document.execCommand("copy")
}

function inputOnChange() {
  let value = ""
  try {
    value = JSON.parse(input_el.value)
  } catch (error) {
    alert(error)
  }

  if (value != "") {
    setData(value)
    input_el.value = ""
  }
}
