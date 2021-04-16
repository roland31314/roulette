import cloneDeep from "lodash/cloneDeep"
const ROULETTLE_KEY = "roulette"
const local_data = JSON.parse(localStorage.getItem("roulette"))

let roulette_data = local_data || {
  index : 1,
  data  : [
    {
      title : "今晚吃什麼",
      list : [
        { name: "鹽水雞", weight: 1 },
        { name: "健康便當", weight: 1 },
        { name: "滷味", weight: 1 },
        { name: "自助餐", weight: 1 },
        { name: "8-1便當", weight: 1 },
        { name: "好佳麵館", weight: 1 },
        { name: "蒜泥白肉", weight: 1 },
        { name: "建宏雞肉飯", weight: 1 },
        { name: "燴飯+雙蛋煎", weight: 1 },
        { name: "台南虱目魚", weight: 1 },
        { name: "九月茶餐廳", weight: 1 },
        { name: "鎮源麵攤", weight: 1 },
        { name: "黃記魯肉飯", weight: 1 },
        { name: "燒臘便當", weight: 1 },
      ],
    },
    {
      title: "早餐吃什麼",
      list: [
        { name: "火腿蛋", weight: 1 },
        { name: "蔥抓餅", weight: 1 },
        { name: "炒飯", weight: 1 },
        { name: "薯餅蛋餅", weight: 1 },
        { name: "肉鬆蛋餅蛋", weight: 1 },
      ],
    }
  ],
}

let onChangeFunc = () => {}

export function getData() {
  return roulette_data
} 

export function setData(data) {
  roulette_data = cloneDeep(data)
  onChangeFunc(data)
  localStorage.setItem(ROULETTLE_KEY, JSON.stringify(data))
}

export function onChange(func) {
  onChangeFunc = func
}

