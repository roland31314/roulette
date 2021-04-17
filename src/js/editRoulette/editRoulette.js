import { editRouletteFormInit, refreshForm } from "./editRouletteForm.js"

function editRoulette() {
  let edit_roulette_container = document.querySelector("#edit-roulette-container")
  let edit_btn = document.querySelector("#edit-icon")
  let close_btn = document.querySelector("#close-icon")

  edit_btn.addEventListener("click", editBtnOnClick)
  close_btn.addEventListener("click", closeBtnOnClick)

  editRouletteFormInit()

  function editBtnOnClick(){
    edit_roulette_container.classList.add("open")
    edit_roulette_container.classList.add("container")
  }

  function closeBtnOnClick() {
    edit_roulette_container.classList.remove("open")
    edit_roulette_container.classList.remove("container")
    
    refreshForm()
  }
}

export default editRoulette
