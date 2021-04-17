import { getData, setData } from "Store/rouletteStore.js"
import cloneDeep from "lodash/cloneDeep"
import isEqual from "lodash/isEqual"

let roulette_data = cloneDeep(getData())

export function editRouletteFormInit() {
  creatRuoletteOptions()
  updateRouletteList(parseInt(roulette_data.index))
}

function creatRuoletteOptions() {
  const select_roulette = document.querySelector("#edit-roulette-container #select-roulette")

  select_roulette.innerHTML = ""
  for (let i = 0; i < roulette_data.data.length; i++) {
    var option_el = document.createElement('option')
    option_el.innerText = roulette_data.data[i].title
    option_el.value = i
    select_roulette.appendChild(option_el)
  }
  select_roulette.value = roulette_data.index

  select_roulette.onchange = (e) => {
    var index = parseInt(e.target.value)
    roulette_data.index = index
    updateRouletteList(index)
    setData(roulette_data)
  };
}

function updateRouletteList(index) {
  const list_el = document.querySelector("#edit-roulette-container ul.items")
  list_el.innerHTML = ""

  if (typeof index == "number") {
    const { list } = roulette_data.data[index]
    
    for (let i = 0; i < list.length; i++) {
      let { name, weight } = list[i]
      const roulette_item = new RouletteItem(i, name, weight);
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

  input_weight_el.value = parseInt(weight)
  input_weight_el.type = "number"
  input_weight_el.min = "1"
  input_weight_el.onkeyup = () => { setList(index, "weight", parseInt(input_weight_el.value)) }
  input_weight_el.onmouseup = () => { setList(index, "weight", parseInt(input_weight_el.value)) }

  del_icon_el.className = "fas fa-trash"

  li_el.className = "item-align"
  li_el.appendChild(input_name_el)
  li_el.appendChild(input_weight_el)
  li_el.appendChild(del_icon_el)

  return li_el
}

function setList(index, key, val){
  roulette_data.data[roulette_data.index].list[index][key] = val
}

export function saveFormData() {
  if (!isEqual(roulette_data, getData())){
    setData(roulette_data)
  }
}
