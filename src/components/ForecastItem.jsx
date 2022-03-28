import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ForecastItem({ forecast: { Day, Temperature, EpochDate } }) {
  const [fullDate, setFullDate] = useState('');
  const { isCelsius } = useSelector((state) => state.weather);

  useEffect(() => {
    setFullDate(new Date(EpochDate * 1000));
  }, [EpochDate]);

  // the Forecast data for 5 days does not contain Celsius only
  // fahrenheit, so i use this formula
  const fahrenheitToCelsius = (f_min, f_max) => {
    return ((5 / 9) * (Math.round((f_min + f_max) / 2) - 32)).toFixed(1);
  };

  return (
    <div className='card shadow-md compact side bg-base-120'>
      <div className='flex-col items-center space-x-2 card-body '>
        <h1 className='card-title'>{fullDate.toString().slice(0, 4)}</h1>
        <div className='space-x-2 card-body'>
          {isCelsius ? (
            <div className='space-x-2 card-body'>
              {fahrenheitToCelsius(
                Temperature.Minimum.Value,
                Temperature.Maximum.Value
              )}
              °c
            </div>
          ) : (
            <div className='space-x-2 card-body'>
              {Math.round(
                (Temperature.Minimum.Value + Temperature.Maximum.Value) / 2
              )}
              °f
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ForecastItem.propTypes = {
  forecast: PropTypes.object.isRequired,
};
export default ForecastItem;
