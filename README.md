# weather react app

Herolo Home Assignment - Weather.
forecasting application

- Search for weather forecast for any city you choose
- Option to add or remove a selected city from the favorites
- View current weather and next 5 days

- Convert Fahrenheit to Celsius

# Usage

### Set Environment Variables

Rename the .envexample to .env and add your personal token
you can find here [accuweather.com](https://developer.accuweather.com/)

and add this line "const token = process.env.REACT_APP_TOKEN;"
to your weatherService.js file

also add in package.json "proxy": "https://dataservice.accuweather.com",
for faster way

live demo:

[herolo-weather-home-task.vercel.app](https://herolo-weather-task.vercel.app/)

## Run

### Install dependencies

```bash
npm install
```

### Run

```bash
npm run start
```
