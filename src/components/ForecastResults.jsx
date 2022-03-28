import { useSelector, useDispatch } from 'react-redux';
import ConvertButton from './layout/ConvertButton';
import { TiHeartOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { GrMapLocation } from 'react-icons/gr';
import ForecastItem from './ForecastItem';
import Spinner from './layout/Spinner';
import { toast } from 'react-toastify';
import {
  addFavorites,
  removeFavorites,
  reset,
} from '../features/weather/weatherSlice';

function ForecastResults() {
  const { currentForecast, isCelsius, isLoading } = useSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SaveToFavorites = async () => {
    if (!currentForecast.favorites) {
      await dispatch(addFavorites());
      toast.success('Added to favorites');
      dispatch(reset());
      navigate('favorites');
    } else {
      toast.error('Already in favorites');
    }
  };

  const removeFromFavorites = async () => {
    await dispatch(removeFavorites());
    toast.success('Remove From Favorites');
    await dispatch(reset());
    navigate('favorites');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {currentForecast.length !== 0 && (
        <div>
          <div className='w-full mx-automb mb-0 '>
            <GrMapLocation className='inline pr-1 text-7xl sm:text-left' />
            <h1 className='inline pr-2 text-2xl right-5'>
              {' '}
              {currentForecast.LocalizedName}
            </h1>
            {isCelsius ? (
              <h2 className='inline pr-2 text-2xl bottom-3'>
                {currentForecast.nowForecastValC}°
                {currentForecast.nowForecastUnitC.toLowerCase()}
              </h2>
            ) : (
              <h2 className='inline pr-2 text-2xl bottom-3'>
                {currentForecast.nowForecastValF}°
                {currentForecast.nowForecastUnitF.toLowerCase()}
              </h2>
            )}

            <div className='sm:text-right '>
              <ConvertButton />
              {!currentForecast.favorites ? (
                <button
                  type='button'
                  className='btn btn-ghost'
                  onClick={SaveToFavorites}
                >
                  <TiHeartOutline className='inline pr-2 text-3xl' />
                  Add To Favorites
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-ghost'
                  onClick={removeFromFavorites}
                >
                  <TiHeartOutline className='inline pr-2 text-3xl' />
                  Remove From Favorites
                </button>
              )}
            </div>
            <div className='hero mb-5'>
              <div className='text-center hero-content'>
                <div className='max-w-lg'>
                  <h1 className='text-4xl mb-8'>
                    {currentForecast.WeatherText}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-8 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 pt-15'>
            {currentForecast.DailyForecasts.map((forecast) => (
              <ForecastItem key={forecast.EpochDate} forecast={forecast} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default ForecastResults;
