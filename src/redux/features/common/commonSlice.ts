import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { setLoading } = commonSlice.actions;

export default commonSlice.reducer;

export const commonSelector = (state: { common: CommonState }) => state.common;
