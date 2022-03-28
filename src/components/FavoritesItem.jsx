import { copyBack, reset } from '.././features/weather/weatherSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function FavoritesItem({
  favorites: {
    LocalizedName,
    Key,
    WeatherText,
    nowForecastValC,
    nowForecastUnitC,
    nowForecastValF,
    nowForecastUnitF,
  },
}) {
  const { isCelsius } = useSelector((state) => state.weather);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toShow = async () => {
    dispatch(reset());
    await dispatch(copyBack(Key));
    navigate('/');
  };

  return (
    <button
      type='button'
      className='.btn btn-ghost rounded-pill '
      onClick={toShow}
    >
      <div className='card shadow-md compact side bg-base-120'>
        <div className='flex-col items-center space-x-2 card-body '>
          <h1 className='card-title'>{LocalizedName}</h1>
          {isCelsius ? (
            <div className='space-x-2 card-body'>
              {nowForecastValC}° {nowForecastUnitC.toLowerCase()}
            </div>
          ) : (
            <div className='space-x-2 card-body'>
              {nowForecastValF}°{nowForecastUnitF.toLowerCase()}
            </div>
          )}
        </div>

        <div className='flex-col items-center space-x-2 card-body '>
          <h2 className='card-title'>{WeatherText}</h2>
        </div>
      </div>
    </button>
  );
}

FavoritesItem.propTypes = {
  favorites: PropTypes.object.isRequired,
};

export default FavoritesItem;
