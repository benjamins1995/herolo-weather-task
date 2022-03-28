import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherService from './weatherService';

const initialState = {
  currentForecast: [],
  text: 'tel aviv',
  textResults: [],
  favoritesList: [],
  isCelsius: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getCurrentForecast = createAsyncThunk(
  'weather/getCurrentForecast',
  async (location, thunkAPI) => {
    try {
      return await weatherService.getCurrentForecast(location);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const setAutoText = createAsyncThunk(
  'weather/setAutoText',
  async (text, thunkAPI) => {
    try {
      return await weatherService.setAutoText(text);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addFavorites = createAsyncThunk(
  'weather/addFavorites',
  (_, thunkAPI) => {}
);

export const removeFavorites = createAsyncThunk(
  'weather/removeFavorites',
  (_, thunkAPI) => {}
);

export const setLocationText = createAsyncThunk(
  'weather/setLocationText',
  (text) => {
    return text;
  }
);

export const copyBack = createAsyncThunk('weather/copyBack', (key) => {
  return key;
});

export const setTemp = createAsyncThunk('weather/setTemp', (bool) => {
  return bool;
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    reset: (state) => {
      state.currentForecast = [];
      state.text = '';
      state.textResults = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setLocationText.fulfilled, (state, action) => {
        state.text = action.payload;
      })
      .addCase(setAutoText.fulfilled, (state, action) => {
        state.textResults = action.payload;
      })
      .addCase(setTemp.fulfilled, (state, action) => {
        state.isCelsius = action.payload;
      })
      .addCase(getCurrentForecast.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentForecast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentForecast = action.payload;
      })
      .addCase(getCurrentForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavorites.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentForecast.favorites = true;
        state.favoritesList.push(state.currentForecast);
      })
      .addCase(removeFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavorites.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.favoritesList.map((favori) =>
          favori.Key === state.currentForecast.Key
            ? state.favoritesList.pop(
                state.favoritesList.indexOf(favori).toString()
              )
            : console.log(favori)
        );
      })

      .addCase(copyBack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(copyBack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoritesList.map((favori) =>
          favori.Key === action.payload
            ? (state.currentForecast = favori)
            : favori
        );
      })

      .addCase(copyBack.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = weatherSlice.actions;
export default weatherSlice.reducer;
