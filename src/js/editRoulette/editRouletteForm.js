import { getData, setData } from "Store/rouletteStore.js"
import cloneDeep from "lodash/cloneDeep"
import isEqual from "lodash/isEqual"

const root_el = document.querySelector("#edit-roulette-container")
const title_el = root_el.querySelector(".title-containter .title")
const input_roulette = root_el.querySelector("#input-roulette")
const select_roulette_el = root_el.querySelector("#select-roulette")
const input_roulette_el = root_el.querySelector("#input-roulette")
const input_roulette_btn_el = root_el.querySelector("#input-roulette-btn")
let roulette_data = cloneDeep(getData())

export function editRouletteFormInit() {
  const add_roulette_btn = root_el.querySelector("#add-roulette-btn")
  const add_item_btn = root_el.querySelector("#add-item-btn")
  const del_toulette_btn = root_el.querySelector("#del-roulette-btn")

  add_roulette_btn.onclick = addRoulette
  input_roulette_btn_el.onclick = refreshForm
  del_toulette_btn.onclick = removeRoulette
  add_item_btn.onclick = addItem

  input_roulette_el.onkeyup = () => { setTitle(input_roulette_el.value) }
  input_roulette_el.onchange = () => { setTitle(input_roulette_el.value) }

  updateRuoletteOptions()
  updateRouletteList(parseInt(roulette_data.index))
}

function addRoulette() {
  title_el.innerText = "新增輪盤"
  input_roulette_el.value = ""
  root_el.classList.add("add-roulette")

  roulette_data.index = roulette_data.data.length
  roulette_data.data.push({ 
    title : "?_?",
    list: [{ name: "項目1", weight: 1 }, { name: "項目2", weight: 1 }, { name: "項目3", weight: 1 }],
  })

  updateRuoletteOptions()
  updateRouletteList(roulette_data.index)
  saveFormData()
}

function removeRoulette() {
  roulette_data.data.splice(roulette_data.index, 1)
  roulette_data.index = roulette_data.data.length - 1

  updateRuoletteOptions()
  updateRouletteList(roulette_data.index)
  saveFormData()
}

function addItem() {
  roulette_data.data[roulette_data.index].list.push({ name: "", weight: 1 })
  updateRouletteList(roulette_data.index)
  saveFormData()
}

function removeItem(index) {
  roulette_data.data[roulette_data.index].list.splice(index, 1)
  updateRouletteList(roulette_data.index)
  saveFormData()
}

function updateRuoletteOptions() {
  select_roulette_el.innerHTML = ""

  for (let i = 0; i < roulette_data.data.length; i++) {
    const option_el = document.createElement('option')
    option_el.innerText = roulette_data.data[i].title
    option_el.value = i
    select_roulette_el.appendChild(option_el)
  }
  select_roulette_el.value = roulette_data.index

  select_roulette_el.onchange = (e) => {
    var index = parseInt(e.target.value)
    roulette_data.index = index
    updateRouletteList(index)
    saveFormData()
  };
}

function updateRouletteList(index) {
  const list_el = root_el.querySelector("ul.items")
  list_el.innerHTML = ""

  if (typeof index == "number") {
    const { list } = roulette_data.data[index]
    
    for (let i = 0; i < list.length; i++) {
      let { name, weight } = list[i]
      const roulette_item = new RouletteItem(i, name, weight)
      list_el.appendChild(roulette_item)
    }
  }
}

function RouletteItem(index, name, weight) {
  const li_el = document.createElement('li')
  const input_name_el = document.createElement('input')
  const input_weight_el = document.createElement('input')
  const del_icon_el = document.createElement('i')

  input_name_el.value = name
  input_name_el.onkeyup = () => { setList(index, "name", input_name_el.value) }
  input_name_el.onchange = () => { setList(index, "name", input_name_el.value) }

  input_weight_el.value = parseInt(weight)
  input_weight_el.type = "number"
  input_weight_el.min = "1"
  input_weight_el.onkeyup = () => { setList(index, "weight", parseInt(input_weight_el.value)) }
  input_weight_el.onmouseup = () => { setList(index, "weight", parseInt(input_weight_el.value)) }

  del_icon_el.className = "fas fa-trash"
  del_icon_el.onclick = removeItem.bind(this, index)

  li_el.className = "item-align"
  li_el.appendChild(input_name_el)
  li_el.appendChild(input_weight_el)
  li_el.appendChild(del_icon_el)

  return li_el
}

function setTitle(title) {
  roulette_data.data[roulette_data.index].title = title
  saveFormData()
}

function setList(index, key, val){
  roulette_data.data[roulette_data.index].list[index][key] = val
  saveFormData()
}

function saveFormData() {
  if (!isEqual(roulette_data, getData())) {
    setData(roulette_data)
  }
}

export function refreshForm(){
  if (root_el.classList.contains("add-roulette")) {
    root_el.classList.remove("add-roulette")
    title_el.innerText = "選擇輪盤"

    updateRuoletteOptions()
    saveFormData()
  }
}
