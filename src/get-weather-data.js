const getWeatherData = (lat, lon) => {
  try {
    let url = `https://weather-orb.netlify.com/.netlify/functions/get-weather-data?lat=${lat}&lon=${lon}`;
    return await axios.post(url);
  } catch (error) {
    console.error(error);
  }
}

export default { getWeatherData };