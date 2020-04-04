const suncalc = require('suncalc');
const differenceInSeconds = require('date-fns/difference_in_seconds');

// determine daylight types for this specific date/location
const suninfo = suncalc.getTimes(
  new Date(),
  lat,
  lon,
);

// current time in
const currentTime = new Date(darksky.time * 1000);

console.log(suninfo);
const daylightPeriods = {
  PRE_DAWN: 'pre-dawn',
  DAWN: 'dawn',
  SUNRISE: 'sunrise',
  MORNING_GOLDEN_HOUR: 'morning-golden-hour',
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  AFTERNOON_GOLDEN_HOUR: 'afternoon_golden_hour',
  SUNSET: 'afternoon_golden_hour',
  TWILIGHT: 'twilight',
  DUSK: 'dusk',
  NIGHT: 'night',
};

const getDaylightQuality = (currentTime, lat, lon) => {
// pre-dawn
  if (
    currentTime >= new Date(suninfo.nightEnd)
    && currentTime < new Date(suninfo.dawn)
  ) {
    return daylightPeriods.PRE_DAWN;
  }
  // dawn
  if (
    currentTime >= new Date(suninfo.dawn)
    && currentTime < new Date(suninfo.sunrise)
  ) {
    return daylightPeriods.DAWN;
  }
  // sunrise
  if (
    currentTime >= new Date(suninfo.sunrise)
    && currentTime < new Date(suninfo.sunriseEnd)
  ) {
    return daylightPeriods.SUNRISE;
  }
  // morning golden hour
  if (
    currentTime >= new Date(suninfo.sunriseEnd)
    && currentTime < new Date(suninfo.goldenHourEnd)
  ) {
    return daylightPeriods.MORNING_GOLDEN_HOUR;
  }
  // morning
  if (
    currentTime >= new Date(suninfo.goldenHourEnd)
    && currentTime < new Date(suninfo.solarNoon)
  ) {
    return daylightPeriods.MORNING;
  }
  // afternoon
  if (
    currentTime >= new Date(suninfo.solarNoon)
    && currentTime < new Date(suninfo.goldenHour)
  ) {
    return daylightPeriods.AFTERNOON;
  }
  // afternoon golden hour
  if (
    currentTime >= new Date(suninfo.goldenHour)
    && currentTime < new Date(suninfo.sunsetStart)
  ) {
    return daylightPeriods.AFTERNOON_GOLDEN_HOUR;
  }
  // sunset
  if (
    currentTime >= new Date(suninfo.sunsetStart)
    && currentTime < new Date(suninfo.sunset)
  ) {
    return daylightPeriods.SUNSET;
  }
  // twilight
  if (
    currentTime >= new Date(suninfo.sunset)
    && currentTime < new Date(suninfo.dusk)
  ) {
    return daylightPeriods.TWILIGHT;
  }
  // dusk
  if (
    currentTime >= new Date(suninfo.dusk)
    && currentTime < new Date(suninfo.night)
  ) {
    return daylightPeriods.DUSK;
  }

  // night
  return daylightPeriods.NIGHT;
};

const progressThroughPeriod = (period, currentTime) => {

};

const periodLength = (period) => {

};


function calculateProgress(minValue, maxValue, currentValue) {
  return (currentValue - minValue) / (maxValue - minValue);
}

module.exports = getDaylightQuality;
