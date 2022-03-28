import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { setTemp } from '../../features/weather/weatherSlice';

const ConvertButton = () => {
  const { isCelsius } = useSelector((state) => state.weather);

  const dispatch = useDispatch();

  const setTrue = async () => {
    toast.success('Switch to fahrenheit');
    await dispatch(setTemp(!isCelsius));
  };

  const setFalse = async () => {
    toast.success('Switch to Celsius');
    await dispatch(setTemp(!isCelsius));
  };

  return (
    <div className='sm:text-right  text-gray-600/100'>
      {isCelsius ? (
        <button type='button' class='btn btn btn-ghost mb-8' onClick={setTrue}>
          <HiOutlineSwitchHorizontal className='inline pr-2 text-3xl' />
          Switch to fahrenheit°
        </button>
      ) : (
        <button type='button' class='btn btn btn-ghost mb-8' onClick={setFalse}>
          <HiOutlineSwitchHorizontal className='inline pr-2 text-3xl' />
          Switch to Celsius°
        </button>
      )}
    </div>
  );
};

export default ConvertButton;
