//scss
import "./style/index.scss";

//js
import "./js/roulette/roulette.js";
import "./js/editRoulette/editRoulette.js";

if (module.hot) {
  module.hot.accept();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").classList.remove("preload");
});