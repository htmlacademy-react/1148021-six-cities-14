import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

const initialState: {
  error: string | null;
} = {
  error: null,
};

export const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = citiesSlice.actions;
