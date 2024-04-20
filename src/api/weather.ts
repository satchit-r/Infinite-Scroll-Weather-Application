// api/weather.ts
const API_KEY = "22143a74319311627335406fbc504e0d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (cityId: string) => {
  const url = `${BASE_URL}?id=${cityId}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
