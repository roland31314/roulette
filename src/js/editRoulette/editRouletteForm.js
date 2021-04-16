import { getData } from "Store/rouletteStore.js"

const roulette_data = getData()

function editRouletteForm() {
  creatRuoletteOptions()
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
    updateRouletteList(parseInt(e.target.value)) 
  };
}

function updateRouletteList(index) {
  const list_el = document.querySelector("#edit-roulette-container ul.items")
  list_el.innerHTML = ""

  if (typeof index == "number") {
    const { list } = roulette_data.data[index]
    
    for (let i = 0; i < list.length; i++) {
      let { name, weight } = list[i]
      const roulette_item = new RouletteItem(name, weight);
      list_el.appendChild(roulette_item)
    }
  }
}

function RouletteItem(name, weight) {
  const li_el = document.createElement('li')
  const input_name_el = document.createElement('input')
  const input_weight_el = document.createElement('input')
  const del_icon_el = document.createElement('i')

  input_name_el.value = name
  input_name_el.disabled = "disabled"

  input_weight_el.value = parseInt(weight)
  input_weight_el.type = "number"
  input_weight_el.disabled = "disabled"

  del_icon_el.className = "fas fa-trash"

  li_el.className = "item-align"
  li_el.appendChild(input_name_el)
  li_el.appendChild(input_weight_el)
  li_el.appendChild(del_icon_el)
  li_el.onclick = () => {
    input_name_el.disabled = ""
    input_weight_el.disabled = ""
  }

  return li_el
}

export default editRouletteForm