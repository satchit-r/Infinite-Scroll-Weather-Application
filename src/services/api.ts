import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: "22143a74319311627335406fbc504e0d", 
    lang: "pt_br", 
    units: "metric", 
  },
});

export default api;
