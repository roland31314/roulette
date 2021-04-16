import { getData } from "Store/rouletteStore.js";

function editRoulette() {
  let edit_roulette_container = document.querySelector("#edit-roulette-container");
  let edit_btn = document.querySelector("#edit-icon");
  let close_btn = document.querySelector("#close-icon");

  edit_btn.addEventListener("click", editBtnOnClick);
  close_btn.addEventListener("click", closeBtnOnClick);

  function editBtnOnClick(){
    edit_roulette_container.classList.add("open")
    edit_roulette_container.classList.add("container")
  }

  function closeBtnOnClick() {
    edit_roulette_container.classList.remove("open")
    edit_roulette_container.classList.remove("container")
  }
}

console.log(getData());

editRoulette()