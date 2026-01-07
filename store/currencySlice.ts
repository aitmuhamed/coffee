
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyState, CurrencyCode } from '../types';

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  MNT: '₮',
  KZT: '₸',
  RUB: '₽'
};

const initialState: CurrencyState = {
  code: (localStorage.getItem('currency') as CurrencyCode) || 'USD',
  symbol: SYMBOLS[(localStorage.getItem('currency') as CurrencyCode) || 'USD'],
  rate: 1,
  lastUpdated: null,
  rates: { USD: 1, MNT: 3450, KZT: 450, RUB: 90 }, // Fallback rates
  isLoading: false
};

export const fetchRates = createAsyncThunk('currency/fetchRates', async () => {
  const response = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await response.json();
  return {
    rates: {
      USD: 1,
      MNT: data.rates.MNT,
      KZT: data.rates.KZT,
      RUB: data.rates.RUB
    },
    time: data.time_last_update_utc
  };
});

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.code = action.payload;
      state.symbol = SYMBOLS[action.payload];
      state.rate = state.rates[action.payload];
      localStorage.setItem('currency', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.lastUpdated = action.payload.time;
        state.rate = state.rates[state.code];
        state.isLoading = false;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
