import axios from 'axios';

// first i have try to put this line'https://dataservice.accuweather.com'
// in the package.json as proxy, buy the server having problem so, i move it back here
const API_URL = 'https://dataservice.accuweather.com';

// In addition, the api key (token), in the start i put it in the .env file and when
// i uploaded the app, i put the token in Environment Variables in the server part
// but when i go to deploy, the app not Identified the Environment Variables
// "const token = process.env.REACT_APP_TOKEN;", (Did not work with the server I tried.)
// so i put it inside here in this service file
//
// I'm sorry I know this is not acceptable, nor private but I wanted to submit on time and
// also have a product that works

// The more common way is to upload the key to another server and use it from there (also
// more private), but I did not succeed in time

const token = '1JX5EQZ7ZFUMDvLtNYDxJccAxKRZpVnS';

// Hope you will understand

const API_URL_LOCATION = API_URL + '/locations/v1/search?';
const API_URL_AUTO_COMPLETE = API_URL + '/locations/v1/cities/autocomplete?';
const API_URL_WEEK_FORECASTS = API_URL + '/forecasts/v1/daily/5day/';
const API_URL_HOUR_FORECASTS = API_URL + '/currentconditions/v1/';

// Get weather by city
const getCurrentForecast = async (location) => {
  let forecastForm = {
    Key: null,
    LocalizedName: null,
    nowForecastValC: null,
    nowForecastUnitC: null,
    nowForecastValF: null,
    nowForecastUnitF: null,
    WeatherText: null,
    DailyForecasts: [],
    favorites: false,
  };

  const params = new URLSearchParams({
    apikey: token,
    q: location,
  });

  // getting the key
  const resId = await axios.get(API_URL_LOCATION + params);

  forecastForm.Key = resId.data[0].Key;
  forecastForm.LocalizedName = resId.data[0].LocalizedName;

  // get location by ID --Forecast
  const response = await axios.get(
    API_URL_WEEK_FORECASTS + `${resId.data[0].Key}?apikey=${token}`
  );
  forecastForm.DailyForecasts = response.data.DailyForecasts;

  // get location by ID --Forecast
  const responseCurrent = await axios.get(
    API_URL_HOUR_FORECASTS + `${resId.data[0].Key}?apikey=${token}`
  );

  forecastForm.WeatherText = responseCurrent.data[0].WeatherText;

  forecastForm.nowForecastUnitF =
    responseCurrent.data[0].Temperature.Imperial.Unit;
  forecastForm.nowForecastUnitC =
    responseCurrent.data[0].Temperature.Metric.Unit;
  forecastForm.nowForecastValF =
    responseCurrent.data[0].Temperature.Imperial.Value;
  forecastForm.nowForecastValC =
    responseCurrent.data[0].Temperature.Metric.Value;

  return forecastForm;
};

const setAutoText = async (text) => {
  const params = new URLSearchParams({
    apikey: token,
    q: text,
  });

  const resAuth = await axios.get(API_URL_AUTO_COMPLETE + params);
  let data = [];

  resAuth.data.map((a) => data.push(a.AdministrativeArea.LocalizedName));

  return data;
};

const weatherService = {
  getCurrentForecast,
  setAutoText,
};

export default weatherService;
