//scss
import "./style/index.scss";

//js
import roulette from "./js/roulette/roulette.js";
import editRoulette from "./js/editRoulette/editRoulette.js";

roulette();
editRoulette();

if (module.hot) {
  module.hot.accept();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").classList.remove("preload");
});