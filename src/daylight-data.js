const suncalc = require('suncalc');
const differenceInSeconds = require('date-fns/difference_in_seconds');

// determine the kind of daylight
const suninfo = suncalc.getTimes(
  new Date(),
  lat,
  lon,
);

// current time in
const currentTime = new Date(darksky.time * 1000);

console.log(suninfo);

const getDaylightQuality = (lat, lon) => {
// pre-dawn
  if (
    currentTime >= new Date(suninfo.nightEnd)
    && currentTime < new Date(suninfo.dawn)
  ) {
    return 'pre-dawn';
  }
  // dawn
  if (
    currentTime >= new Date(suninfo.dawn)
    && currentTime < new Date(suninfo.sunrise)
  ) {
    const dawnDuration = differenceInSeconds(
      new Date(suninfo.sunrise),
      new Date(suninfo.dawn),
    );
    const dawnProgress = differenceInSeconds(
      currentTime,
      new Date(suninfo.sunrise),
    );

    const progress = eases.cubicIn(dawnProgress / dawnDuration);
    settings.daylightValue = lerp(2.3, 1.8, progress);
    settings.saturation = lerp(0.2, 0.6, progress);
  }
  // sunrise
  else if (
    currentTime >= new Date(suninfo.sunrise)
    && currentTime < new Date(suninfo.sunriseEnd)
  ) {
    const sunriseDuration = differenceInSeconds(
      new Date(suninfo.sunriseEnd),
      new Date(suninfo.sunrise),
    );
    const sunriseProgress = differenceInSeconds(
      currentTime,
      new Date(suninfo.sunrise),
    );

    const progress = eases.cubicOut(sunriseProgress / sunriseDuration);

    settings.daylightValue = lerp(1.8, 1.2, progress);
    settings.saturation = lerp(0.6, 0.7, progress);
  }
  // golden hour
  else if (
    currentTime >= new Date(suninfo.sunriseEnd)
    && currentTime < new Date(suninfo.goldenHourEnd)
  ) {
    settings.daylightValue = 1.2;
    settings.saturation = 0.7;
  }
  // morning
  else if (
    currentTime >= new Date(suninfo.goldenHourEnd)
    && currentTime < new Date(suninfo.solarNoon)
  ) {
    settings.daylightValue = 1.0;
    settings.saturation = 1.0;
  }
  // afternoon
  else if (
    currentTime >= new Date(suninfo.solarNoon)
    && currentTime < new Date(suninfo.goldenHour)
  ) {
    settings.daylightValue = 1.0;
    settings.saturation = 1.0;
  }
  // golden hour
  else if (
    currentTime >= new Date(suninfo.goldenHour)
    && currentTime < new Date(suninfo.sunsetStart)
  ) {
    settings.daylightValue = 1.0;
    settings.saturation = 1.0;
  }
  // sunset
  else if (
    currentTime >= new Date(suninfo.sunsetStart)
    && currentTime < new Date(suninfo.sunset)
  ) {
    const secondsBetween = differenceInSeconds(
      new Date(suninfo.sunset),
      new Date(suninfo.sunsetStart),
    );
    const secondsOfProgress = differenceInSeconds(
      currentTime,
      new Date(suninfo.sunsetStart),
    );
    const progress = secondsOfProgress / secondsBetween;

    settings.daylightValue = lerp(1.0, 1.4, progress);
    settings.saturation = 1.0;
  }
  // twilight
  else if (
    currentTime >= new Date(suninfo.sunset)
    && currentTime < new Date(suninfo.dusk)
  ) {
    settings.daylightValue = 1.4;
    settings.saturation = 0.3;
  }
  // dusk
  else if (
    currentTime >= new Date(suninfo.dusk)
    && currentTime < new Date(suninfo.night)
  ) {
    settings.daylightValue = 2.0;
    settings.saturation = 0.3;
  }
  // night
  else {
    settings.daylightValue = 2.5;
    settings.saturation = 0.2;
  }
};

function calculateProgress(minValue, maxValue, currentValue) {
  return (currentValue - minValue) / (maxValue - minValue);
}

modules.exports = getDaylightQuality;
