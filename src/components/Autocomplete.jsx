import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from './layout/Spinner';
import {
  getCurrentForecast,
  setLocationText,
  setAutoText,
} from '.././features/weather/weatherSlice';

const AutoComplete = () => {
  const letterNumber = /^[ a-zA-Z ]*$/;
  const { text, textResults, isLoading, isError, message } = useSelector(
    (state) => state.weather
  );

  const dispatch = useDispatch();

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // set default to tel aviv city
  useEffect(() => {
    if (text === 'tel aviv') {
      if (isError) {
        toast.error(message);
      } else {
        dispatch(getCurrentForecast(text));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Two options for submit input text, 1.onClick, 2.handleSubmit.
  const onClick = async (e) => {
    dispatch(setLocationText(e.target.innerText));
    if (isError) {
      toast.error(message);
    } else {
      await dispatch(getCurrentForecast(e.target.innerText));
    }

    e.preventDefault();
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === '') {
      toast.error('Please Enter Location');
    } else {
      if (isError) {
        toast.error(message);
      } else {
        dispatch(getCurrentForecast(text));
      }
    }
  };

  const onKeyDown = (key: any) => {
    if (key.keyCode === 13 || key.keyCode === 9) {
      dispatch(setLocationText(filteredSuggestions[activeSuggestionIndex]));
      setFilteredSuggestions([]);
    }
  };

  const handleChange = (e) => {
    if (e.target.value.match(letterNumber)) {
      const userInput = e.target.value;
      dispatch(setLocationText(userInput));
      dispatch(setAutoText(userInput));

      // Filter our suggestions that don't contain all letter input
      const unLinked = textResults.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      setFilteredSuggestions(unLinked);
      setActiveSuggestionIndex(0);
      setShowSuggestions(true);
    } else {
      toast.error('only english letter');
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className='suggestions'>
        {filteredSuggestions.map((suggestion, index) => {
          let styleLi;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            styleLi = 'suggestion-active ';
          }
          return (
            <li className={styleLi} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className='no-suggestions'>
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-2
      my-8 gap-9 pb-20'
      >
        <div>
          <form onSubmit={handleSubmit}>
            <div className='form-control '>
              <div className='relative'>
                <input
                  type='text'
                  className='w-full pr-40 bg-gray-200 input input-lg text-black'
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
                  placeholder='Search'
                  value={text}
                />
                {showSuggestions && text && <SuggestionsListComponent />}

                <button
                  type='submit'
                  className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                >
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
