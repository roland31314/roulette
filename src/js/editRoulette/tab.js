const ul_el = document.querySelector("#edit-roulette-container .menu ul")
const section_container_el = document.querySelector(".section-container")

export default function Tab() {

  for (let i = 0; i < ul_el.children.length; i++) {
    const li_el = ul_el.children[i]

    li_el.onclick = tabOnClick.bind(this, i)
  }

}

function tabOnClick(index) {
  for (let i = 0; i < ul_el.children.length; i++) {
    const li_el = ul_el.children[i]
    const section_el = section_container_el.children[i]

    if(i == index) {
      li_el.className = "selected"
      section_el.className = "selected"
    } else {
      li_el.className = ""
      section_el.className = ""
    }
  }
}