function editRoulette() {
  let edit_roulette_container = document.querySelector("#edit-roulette-container");
  let edit_btn = document.querySelector("#edit-icon");

  edit_btn.addEventListener("click", editBtnOnClick);

  function editBtnOnClick(){
    edit_roulette_container.className="open"
  }
}

editRoulette()